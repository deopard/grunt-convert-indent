/*
 * grunt-convert-indent
 * https://github.com/deopard/grunt-convert-indent
 *
 * Copyright (c) 2015 Tom Kim
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  grunt.registerMultiTask('convertindent', 'Grunt task that converts tab/space indention of files in entire project.', function() {
    var options = this.options({
      style: 'space',
      size: 2,
      backupDir: 'convert_backup'
    });
    var leadingWhiteSpace = /^[ \t]+/gm;

    this.files
      .forEach(function (file) {
        file
          .src
          // filter only existing files
          .filter(function (src) {
            if (!grunt.file.exists(src)) {
              grunt.log.warn('Source file "' + src + '" not found.');
              return false;
            } else {
              return true;
            }
          })

          // make backup file
          .forEach(function (src) {
            var backupPath = path.join(options.backupDir, src);
            grunt.file.copy(src, backupPath);

            // convert file
            var fileContent = [];
            grunt.file.read(src)
              .split(/\r\n?|\n/)
              // for each lines
              .forEach(function (line) {
                if (line) {
                  switch (options.style) {
                    case 'space':
                      line = untabifyLine(line);
                      break;
                    case 'tab':
                      line = tabifyLine(line);
                      break;
                  }
                }
                fileContent.push(line);
              });

              grunt.file.write(src, fileContent.join(grunt.util.linefeed));
              grunt.log.writeln(src, 'file converted!');
          });
      });

    function tabifyLine (line) {
      var m = line.match(leadingWhiteSpace);
      m = m && m.length > 0 ? m[0] : null;
      var count = countSpaces(m);
      var tabs = Math.floor(count / options.size);
      var spaces = (count % options.size + options.size) % options.size;
      return line.replace(
        m,
        grunt.util.repeat(tabs, '\t') + grunt.util.repeat(spaces, ' ')
      );
    }

    function untabifyLine (line) {
      var m = line.match(leadingWhiteSpace);
      m = m && m.length > 0 ? m[0] : null;
      var count = countSpaces(m);
      return line.replace(m, grunt.util.repeat(count, ' '));
    }

    function countSpaces (str) {
      var count = 0;
      for (var i=0; str && i<str.length; i++) {
        switch (str[i]) {
          case ' ':
            count += 1;
            break;
          case '\t':
            count += options.size;
            break;
        }
      }
      return count;
    }
  });

};
