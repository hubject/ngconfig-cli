var interfaces = {};

module.exports = {
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
 * @param object
 * @param isArray
 * @returns {*}
 */
function generateObjectInterface(parentKey, object, isArray) {

  var typeName = getInterfaceName(parentKey, isArray);

  for (var key in object) {

    if (object.hasOwnProperty(key)) {

      object[key] = generateValueInterface(key, object[key]);
    }
  }
  if (typeName) interfaces[typeName] = object;

  return typeName;
}

/**
 * Generates interface definition for specified key array pair
 * 
 * @param key
 * @param array
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
 * @param key
 * @param value
 * @param isArray
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
 * @param str
 * @param isArray
 * @returns {*}
 */
function getInterfaceName(str, isArray) {
  if (!str) return null;

  var name = 'I' + capitalize(str);

  if (isArray) {

    // remove last s if is array
    if (name.charAt(name.length - 1) === 's') {

      name = name.substr(0, name.length - 1);
    }
  }
  return name;
}

/**
 * Capitalizes specified string
 * 
 * @param str
 * @returns {string}
 */
function capitalize(str) {

  return str.charAt(0).toUpperCase() + str.substr(1);
}

/**
 * Copies specified object by JSON.stringify and JSON.parse
 * 
 * @param object
 * @returns {object}
 */
function copy(object) {
  return JSON.parse(JSON.stringify(object));
}
