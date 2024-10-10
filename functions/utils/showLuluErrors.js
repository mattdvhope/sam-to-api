const showLuluErrors = (errorData) => {
  // Collect all instances of the key "message"
  const allInstances = findAllKeyValuePairs(errorData, "message");

  // Build an array of formatted messages
  const messages = allInstances.map(({ key, value }, index) => {
    return `Error Msg #${index + 1}: ${value}`;
  });

  // Return the array of messages
  return messages;
}

function findAllKeyValuePairs(data, targetKey, results = []) {
  // Check if the input is an object or an array
  if (typeof data === 'object' && data !== null) {
    // Loop through keys if it's an object, or loop through elements if it's an array
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        // If the key matches the target, add the key-value pair to results array
        if (key === targetKey) {
          results.push({ key, value: data[key] });
        }

        // Recursively search within the object/array if the current element is an object or array
        if (typeof data[key] === 'object') {
          findAllKeyValuePairs(data[key], targetKey, results);
        }
      }
    }
  }
  return results;  // Return the array of found key-value pairs
}

export default showLuluErrors;

