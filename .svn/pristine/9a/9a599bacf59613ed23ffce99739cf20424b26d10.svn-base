
$.fn.extend({
    
    /** Initializer ***/
    pictureTree: function(data) {
        $(this).getFolders(data);
    },
    
    /**
     * Load Folder Structure
     * @param {Object} data Load JSON information for folders
     */
    getFolders: function(data) {
        if (data.hasOwnProperty("items")) {
            if (data.items.hasOwnProperty("folders")) {
                for (var iterator in data.items.folders) {
                    var folder = data.items.folders[iterator];

                    $(this).buildFolder(folder);
                }
            }
        }
    },
    
    /**
     * Create and append main folder Structure
     * @param {Object} folder 
     */
    buildFolder: function(folder) {
        
        var folderContainer = $('<section/>');
        folderContainer.addClass('__pictureTree-folder-wrapper');

        var imageCover = $('<img/>');
        imageCover.attr('src', folder.path + '/' + folder.cover);
        
        var coverWidth = folder.width;
        var coverHeight = folder.height;
        
        folderContainer.width(coverWidth);
        folderContainer.height(coverHeight);
        
        folderContainer.append(imageCover);
        
        var folderOverlay = 
                $(this).buildFolderOverlay(folder.width, folder.height);
        folderContainer.append(folderOverlay);
        
        var pictureNameWrapper = 
                $(this).generatePictureNameWrapper(folder.name);
        folderContainer.append(pictureNameWrapper);      
        
        $(this).append(folderContainer);
        
        $(this).centerPictureNameWrapper(folderContainer, pictureNameWrapper);
        
        $(this).attachClickEventForFolderContainer(folderContainer, folder);
    }, 
    
    /**
     * Create Overlay container
     * @param {int} width
     * @param {int} height
     */
    buildFolderOverlay: function(width, height) {
        var folderOverlay = $('<span/>');
        
        folderOverlay.addClass('__pictureTree-overlay-wrapper');
        folderOverlay.width(width);
        folderOverlay.height(height);
        
        return folderOverlay;
    },
    
    /**
     * Generate Picture Name
     * @param {String} name
     * @return {jQuery Object} pictureNameWraper
     */
    generatePictureNameWrapper: function(name) {
        var pictureNameWraper = $('<span/>');
        
        pictureNameWraper.addClass('__pictureTree-name-picture');
        pictureNameWraper.text(name);
        
        return pictureNameWraper;
    },
    
    /**
     * Center name of image into parent container
     * @param {jQuery Object} folderContainer
     * @param {jQuery Object} pictureNameWraper
     */
    centerPictureNameWrapper: function(folderContainer, pictureNameWraper) {
        var parentHeight = folderContainer.outerHeight(true);
        var parentWidth = folderContainer.outerWidth(true);
        
        var elementHeight = pictureNameWraper.height();
        var elementWidth = pictureNameWraper.width();
        
        var top = (parentHeight - elementHeight) / 2;
        var left = (parentWidth - elementWidth ) / 2;
        
        pictureNameWraper.css({
            top: top,
            left: left 
        });
    },
    
    /**
     * Attach click event for folder container
     * @param {jQuery Object} folderContainer
     * @param {Object} folder
     */
    attachClickEventForFolderContainer: function(folderContainer, folder) {
        var _this = $(this);
        
        folderContainer.click(function() {
            //Reference: folderContainer - $(this)
            
            $('.__pictureTree-folder-wrapper').hide('slow');
            _this.loadFiles(folder);
        });
    },
    
    /**
     * Load folder files
     * @param {folder Object} folder
     */
    loadFiles: function(folder) {
        if (folder.hasOwnProperty('files')) {
            
            for (var iterator in folder.files) {
                var file = folder.files[iterator];
                
                $(this).buildFile(folder.path, file);
            }
        }
    },
    
    /**
     * Create and append file Structure
     * @param {Object} folder
     */
    buildFile: function(folderPath, file) {
        
        var fileContainer = $('<section/>');
        fileContainer.addClass('__pictureTree-file-wrapper');

        var image = $('<img/>');
        image.attr('src', folderPath + '/' + file.path);
        
        var width = file.width;
        var height = file.height;
        
        fileContainer.width(width);
        fileContainer.height(height);
        
        fileContainer.append(image);
        
        var fileOverlay = 
                $(this).buildFolderOverlay(width, height);
        fileContainer.append(fileOverlay);
        
        var pictureNameWrapper = 
                $(this).generatePictureNameWrapper(file.name);
        fileContainer.append(pictureNameWrapper);      
        
        $(this).append(fileContainer);
        
        $(this).centerPictureNameWrapper(fileContainer, pictureNameWrapper);
    }
});

