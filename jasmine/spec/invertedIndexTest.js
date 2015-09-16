describe('Inverted index test', function() {

  var indexGen = new Index();

  describe('Read book data', function() {
    var jsonFile = indexGen.readJsonFile('books.json');
    it('should load json file', function() {

      expect(jsonFile).toBeDefined();
    });

    it('should expect title and text properties of json file objects to be strings', function() {

      expect(jsonFile[0].title).toEqual(jasmine.any(String));
      expect(jsonFile[0].text).toEqual(jasmine.any(String));
    });
  });

  describe('Populate Index', function() {

    indexGen.createIndex('books.json');
    var fileIndex = indexGen.getIndex();

    it('should create file index', function() {
      expect(fileIndex.uniqueTexts).toEqual(jasmine.any(Object));
    });

    it('should create file index', function() {
      expect(fileIndex.textIndex).toEqual(jasmine.any(Object));
    });

    var indexOfA = fileIndex.uniqueTexts.indexOf('a');

    it('should create file index', function() {
      expect(fileIndex.textIndex[indexOfA]).toEqual([0, 1]);
    });
  });

  describe('Search index', function() {

    indexGen.createIndex('books.json');

    it('should return correct index of search strings', function() {

      expect(indexGen.searchIndex('a')).toEqual([0, 1]);
      expect(indexGen.searchIndex('imagination')).toEqual([0]);
      expect(indexGen.searchIndex('imaggination')).toEqual(-1);
    });
  });
});
