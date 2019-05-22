const csp = require('content-security-policy-builder');
const base = require('./base');

module.exports = {
  ...base,
  key: 'nfabbfkbbbcebdmnocndhdombaffkaog',
  // resulting extension id: iddjnlppdcfkhliebhkhbidlhemoncon
  name: 'LMEM - DEV',
  content_security_policy: csp({
    directives: {
      'script-src': ["'self'", "'unsafe-eval'"],
      'object-src': ["'self'"]
    }
  })
};
