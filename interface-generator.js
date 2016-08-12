var interfaces = {};

module.exports = {

  /**
   * Generates interface definitions for specified value
   * @param object {Object|Array}
   * @param [customKey] {string}
   * @returns {{}}
   */
  generate: function (object, customKey) {

    [].concat(object).forEach(function (object) {

      generateObjectInterface(customKey, copy(object));
    });

    var _interfaces = interfaces;
    interfaces = {}; // reset

    return _interfaces;
  }
};

/**
 * Generates interface definition for specified object;
 *
 * @param [parentKey]
 * @param object {Object}
 * @param isArray {boolean}
 * @returns {*}
 */
function generateObjectInterface(parentKey, object, isArray) {

  var typeName = getInterfaceName(parentKey, isArray);

  for (var key in object) {

    if (object.hasOwnProperty(key)) {

      object[key] = generateValueInterface(key, object[key]);
    }
  }
  if (typeName) add(typeName, object);

  return typeName;
}

/**
 * Generates interface definition for specified key array pair
 *
 * @param key {string}
 * @param array {Array}
 * @returns {*}
 */
function generateArrayInterfaces(key, array) {

  if (array.length === 0) {

    return 'any[]';
  }

  return generateValueInterface(key, array[0], true) + '[]'
}

/**
 * Generates interface definitions for specified key value pair
 *
 * @param key {string}
 * @param value {any}
 * @param isArray {boolean}
 * @returns {string}
 */
function generateValueInterface(key, value, isArray) {

  var type = typeof value;

  if (value instanceof Array) {

    type = generateArrayInterfaces(key, value);
  } else if (type === 'object') {

    type = generateObjectInterface(key, value, isArray);
  }

  return type;
}

/**
 * Creates interface name by specified string
 *
 * @param str {string}
 * @param isArray
 * @returns {*}
 */
function getInterfaceName(str, isArray) {
  if (!str) return null;

  var name = 'I' + capitalize(str);

  if (isArray) {

    // remove last s if isArray is true
    if (name.charAt(name.length - 1) === 's') {

      name = name.substr(0, name.length - 1);
    }
  }
  return name;
}

/**
 * Capitalizes specified string
 *
 * @param str {string}
 * @returns {string}
 */
function capitalize(str) {

  return str.charAt(0).toUpperCase() + str.substr(1);
}

/**
 * Copies specified object by JSON.stringify and JSON.parse
 *
 * @param object {Object}
 * @returns {Object}
 */
function copy(object) {
  return JSON.parse(JSON.stringify(object));
}

/**
 * Adds a new or extends an existing interface
 * @param typeName {string}
 * @param object {Object}
 */
function add(typeName, object) {

  if (interfaces[typeName]) {

    // interface already exists, so we will
    // extend this interface by coping each property
    // to exiting one
    for(var key in object) {
      if(object.hasOwnProperty(key) &&
        !(key in interfaces[typeName])) {
        interfaces[typeName][key] = object[key];
      }
    }
  } else {

    interfaces[typeName] = object
  }
}
