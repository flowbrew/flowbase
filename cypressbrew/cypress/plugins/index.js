/// <reference types="cypress" />

var imaps = require("imap-simple");
var quotedPrintable = require("quoted-printable");
var utf8 = require("utf8");
const R = require("ramda");

function decodeQuotedPrintable(s) {
  return utf8.decode(quotedPrintable.decode(String(s)));
}

const emails = ({ login, password, pattern }) => {
  var config = {
    imap: {
      user: login,
      password: password,
      host: "imap.yandex.ru",
      port: 993,
      tls: true,
      authTimeout: 3000
    }
  };

  return imaps.connect(config).then(function(connection) {
    return connection.openBox("INBOX").then(function() {
      var searchCriteria = ["UNSEEN", ["TEXT", pattern]];
      var fetchOptions = {
        bodies: ["HEADER", "TEXT"],
        markSeen: true
      };

      const whichis = R.curry((h, x) => x.which == h);
      const part = R.curry((header, parts) => R.find(whichis(header), parts));

      return connection
        .search(searchCriteria, fetchOptions)
        .then(function(results) {
          const mails = R.pipe(
            R.map(x => {
              return {
                from: part("HEADER", x.parts).body.from[0],
                subject: part("HEADER", x.parts).body.subject[0],
                body: decodeQuotedPrintable(part("TEXT", x.parts).body)
              };
            })
          )(results);
          return mails;
        });
    });
  });
};

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  on("before:browser:launch", (browser = {}, launchOptions) => {
    if (browser.name === "chrome") {
      launchOptions.args.push("--disable-dev-shm-usage");
    }
    return launchOptions;
  });
  on("task", { emails });
};
