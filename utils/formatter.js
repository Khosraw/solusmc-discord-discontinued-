module.exports = {
  formatBytes: function(bytes) {
    if (bytes === 0) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
  },

  parseDuration: function(milliseconds) {
    if (milliseconds >= 86400000) {
      return Math.floor(milliseconds / 86400000) + " days";
    } else if (milliseconds >= 3600000) {
      return Math.floor(milliseconds / 3600000) + " hours";
    } else if (milliseconds >= 60000) {
      return Math.floor(milliseconds / 60000) + " minutes";
    } else {
      return Math.floor(milliseconds / 1000) + " seconds";
    }
  }
};