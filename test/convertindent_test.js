'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.convertindent = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },

  spacify: function (test) {
    var actual = grunt.file.read('test/testing/js-tab/a.js');
    var expected = grunt.file.read('test/expected/js-tab/a.js');
    test.equal(actual, expected, 'tab indents should be converted into spaces for file a.js');

    actual = grunt.file.read('test/testing/js-tab/js2/b.js');
    expected = grunt.file.read('test/expected/js-tab/js2/b.js');
    test.equal(actual, expected, 'tab indents should be converted into spaces for file js2/b.js');

    var backupExists = false;
    backupExists = grunt.file.exists('backup', 'test/testing/js-tab/a.js');
    test.ok(backupExists, 'Backup directory and a.js file should exist');

    backupExists = false;
    backupExists = grunt.file.exists('backup', 'test/testing/js-tab/a.js');
    test.ok(backupExists, 'Backup directory and js2/b.js file should exist');

    test.done();
  },

  tabify: function (test) {
    var actual = grunt.file.read('test/testing/js-space/a.js');
    var expected = grunt.file.read('test/expected/js-space/a.js');
    test.equal(actual, expected, 'space indents should be converted into tabs for file a.js');

    actual = grunt.file.read('test/testing/js-space/js2/b.js');
    expected = grunt.file.read('test/expected/js-space/js2/b.js');
    test.equal(actual, expected, 'space indents should be converted into tabs for file js2/b.js');

    var backupExists = false;
    backupExists = grunt.file.exists('convert_backup', 'test/testing/js-space/a.js');
    test.ok(backupExists, 'Default backup directory and a.js file should exist');

    backupExists = false;
    backupExists = grunt.file.exists('convert_backup', 'test/testing/js-space/a.js');
    test.ok(backupExists, 'Default backup directory and js2/b.js file should exist');

    test.done();
  },

  afterAllTestsAreFinished: function (test) {
    console.log('\nAll tests are finished! Generate test data for next test and clean up data\n');

    grunt.file.copy('test/fixtures/js-tab/a.js', 'test/testing/js-tab/a.js');
    grunt.file.copy('test/fixtures/js-tab/js2/b.js', 'test/testing/js-tab/js2/b.js');

    grunt.file.copy('test/fixtures/js-space/a.js', 'test/testing/js-space/a.js');
    grunt.file.copy('test/fixtures/js-space/js2/b.js', 'test/testing/js-space/js2/b.js');

    grunt.file.delete('backup');
    grunt.file.delete('convert_backup');
    grunt.file.delete('test/testing');

    test.done();
  },

  tearDown: function (callback) {
    callback();
  }
};
