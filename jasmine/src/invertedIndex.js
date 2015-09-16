var Index = function() {};

Index.prototype.generatedIndex = {};

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

Index.prototype.createIndex = function(filePath) {

  var allTexts = this.readJsonFile(filePath);

  var posIndex = [];
  var uniqueTexts = [];

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
  this.generatedIndex = {
    uniqueTexts: uniqueTexts,
    textIndex: posIndex
  };
}

Index.prototype.getIndex = function() {

  return this.generatedIndex;
}

Index.prototype.searchIndex = function(item) {

  var itemIndex = this.getIndex().uniqueTexts.indexOf(item);

  if (itemIndex === -1) {
    return -1;
  } else {
    return this.getIndex().textIndex[itemIndex];
  }
}
