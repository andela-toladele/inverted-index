var Index = function() {};

//This object holds generated index
Index.prototype.generatedIndex = {};

//Reads and returns a json file from the specified path 
Index.prototype.readJsonFile = function(filePath) {

  var jsonFile;
  $.ajax({
    'async': false,
    'url': filePath,
    'dataType': "json",
    'success': function(data) {
      jsonFile = data;
    }
  });

  return jsonFile;
}

//Creates index from the specified json file
Index.prototype.createIndex = function(filePath) {

  //Retrieves the texts from the json file
  var allTexts = this.readJsonFile(filePath);

  var posIndex = []; //Stores the index
  var uniqueTexts = []; //Stores unique texts

  //Loops through the entire text array and generates index for text
  for (var i = 0; i < allTexts.length; i++) {

    var text = allTexts[i].text.replace(".", "").split(" ");

    for (var j = 0; j < text.length; j++) {

      var pos = uniqueTexts.indexOf(text[j]);

      if (pos > -1) {

        var index = posIndex[pos];

        if (index.indexOf(i) === -1) {
          posIndex[pos].push(i);
        }
      } else {
        uniqueTexts[uniqueTexts.length] = text[j];
        posIndex[posIndex.length] = [i];
      }
    }
  }
  //Creates the index object
  this.generatedIndex = {
    uniqueTexts: uniqueTexts,
    textIndex: posIndex
  };
}

//Returns the generated index
Index.prototype.getIndex = function() {

  return this.generatedIndex;
}

//Searches for the index of the specified item in the uniqueTexts array of this.generatedIndex 
//object and returns the matching index from the textIndex array of this.generatedIndex object
Index.prototype.searchIndex = function(item) {

  var itemIndex = this.getIndex().uniqueTexts.indexOf(item);

  if (itemIndex === -1) {
    return -1;
  } else {
    return this.getIndex().textIndex[itemIndex];
  }
}
