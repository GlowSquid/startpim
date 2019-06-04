const fs = require("fs");
const { exec } = require("child_process");

class BookmarkTitle {
  static getTitle(url) {
    function showMe() {
      let titleFile = "api/bin/title.txt";
      fs.readFile(titleFile, function(err, buf) {
        const title = buf.toString();
        console.log("Finished Title:", title);
        return title;
      });
    }

    console.log("Getting title of:", url);
    let titleFile = "api/bin/title.txt";
    try {
      if (fs.existsSync(titleFile)) {
        fs.truncate(titleFile, 0, function() {
          console.log("File Deleted");
        });
      }
    } catch (err) {
      console.log(err);
    }
    // exec(`api/bin/lynx.sh ${url}`, err => {
    exec(
      // eslint-disable-next-line max-len
      `/usr/bin/lynx -cfg=/etc/lynx.cfg -term=vt100 -display_charset=utf-8 -nopause -noprint -accept_all_cookies -cmd_script=/home/q/d/www/startpim/api/bin/lynx.txt $1 ${url}`,
      err => {
        if (err) {
          console.log(err);
        }
        // console.log("Title Added");
        showMe();
        fs.readFile(titleFile, function(err, buf) {
          const title = buf.toString();
          console.log("Finished Title:", title);
          return title;
        });
      }
    );
  }
}

module.exports = BookmarkTitle;
