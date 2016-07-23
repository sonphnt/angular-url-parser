angular
  .module('angular-url-parser', [])
  .factory('urlParser', function () {
    'use strict';

    function urlParser(url) {
      var parser = document.createElement('a'), searchObject = {}, queries, split, i;

      // Let the browser do the work
      parser.href = url;

      // Convert query string to object
      queries = parser.search.replace(/^\?/, '').split('&');

      for( i = 0; i < queries.length; i++ ) {
        split = queries[i].split('=');
        searchObject[split[0]] = split[1];
      }

      return {
        protocol: parser.protocol,    // ex: http:
        host: parser.host,            // ex: localhost:3000
        hostname: parser.hostname,    // ex: localhost
        port: parser.port,            // ex: 3000
        pathname: parser.pathname,    // ex: /models
        search: parser.search,
        searchObject: searchObject,
        hash: parser.hash
      };
    }

    return {
      /**
       * Returns the protocol part of the given url
       *
       * Example:
       * >   Input: 'http://localhost:3000/models?sort=asc'
       * >   Output: 'http:'
       *
       * @param {string} [url] - location.href if not specified
       * @returns {string}
       */
      getProtocol: function (url) {
        url = url || window.location.href;
        return urlParser(url).protocol;
      },

      /**
       * Returns the host part of the given url
       *
       * Example:
       * >   Input: 'http://localhost:3000/models?sort=asc'
       * >   Output: 'localhost:3000'
       *
       * @param {string} [url] - location.href if not specified
       * @returns {string}
       */
      getHost: function (url) {
        url = url || window.location.href;
        return urlParser(url).host;
      },

      /**
       * Returns the hostname part of the given url
       *
       * Example:
       * >   Input: 'http://localhost:3000/models?sort=asc'
       * >   Output: 'localhost'
       *
       * @param {string} [url] - location.href if not specified
       * @returns {string}
       */
      getHostname: function (url) {
        url = url || window.location.href;
        return urlParser(url).hostname;
      },

      /**
       * Returns the port of the given url
       *
       * Example:
       * >   Input: 'http://localhost:3000/models?sort=asc'
       * >   Output: '3000'
       *
       * @param {string} [url] - location.href if not specified
       * @returns {string}
       */
      getPort: function (url) {
        url = url || window.location.href;
        return urlParser(url).port;
      },

      /**
       * Returns the pathname part of the given url
       *
       * Example:
       * >   Input: 'http://localhost:3000/models?sort=asc'
       * >   Output: '/models'
       *
       * @param {string} [url] - location.href if not specified
       * @returns {string}
       */
      getRoute: function (url) {
        url = url || window.location.href;
        return urlParser(url).pathname;
      },

      /**
       * Returns the list of element in the pathname part of the given url
       *
       * Example:
       * >   Input: 'http://localhost:3000/models/047256ce-850c-4408-83eb-4da873690b1c?sort=asc'
       * >   Output: ['models', '047256ce-850c-4408-83eb-4da873690b1c']
       *
       * @param {string} [url] - location.href if not specified
       * @returns {Array}
       */
      getRouteAttributes: function(url) {
        return this.getRoute(url).split('/');
      },

      /**
       * Returns the query part of the given url
       *
       * Example:
       * >   Input: 'http://localhost:3000/models?sort=asc'
       * >   Output: '?sort=asc'
       *
       * @param {string} [url] - location.href if not specified
       * @returns {string}
       */
      getQuerystring: function (url) {
        url = url || window.location.href;
        return urlParser(url).search;
      },

      /**
       * Returns a single option or the whole query string of the given url
       *
       * Example:
       * >   Input: 'http://localhost:3000/models?sort=asc'
       * >   Output: {sort: 'asc'}
       *
       * >   Input: 'http://localhost:3000/models?sort=asc'  -  sort
       * >   Output: 'asc'
       *
       * @param {string} [param] -
       * @param {string} [url] - location.href if not specified
       * @returns {object} if param is not defined
       * @returns {string} if param is a valid parameter of the given url
       */
      getOption: function (param, url) {
        url = url || window.location.href;

        var searchOject = urlParser(url).searchObject;

        if (typeof param === 'string') {
          return (searchOject.hasOwnProperty(param) === true)
            ? searchOject[param]
            : null;
        } else {
          return searchOject;
        }
      },

      /**
       * Returns the hash part of the given url
       *
       * Example:
       * >   Input: 'http://localhost:3000/models?sort=asc#quantiles'
       * >   Output: 'quantiles'
       *
       * @param {string} [url] - location.href if not specified
       * @returns {string}
       */
      getHash: function (url) {
        url = url || window.location.href;
        return urlParser(url).hash;
      }
    };
  });