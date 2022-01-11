const fs = require('fs')

exports.writeOutputPayload = (content) => {

  try {
    const data = fs.readFileSync('./output.json', 'utf8')
    obj = JSON.parse(data); //now it an object
    obj.push(content); //add some data
    json = JSON.stringify(obj); //convert it back to json

    writeJsonFile(json);

  } catch (err) {
    // need to check type error before create file
    writeJsonFile(JSON.stringify([content]));
  }

};

const writeJsonFile = (json) => {
  try {
    fs.writeFileSync('./output.json', json, 'utf8')

    //file written successfully
  } catch (err) {
    console.error(err)
  }

}

