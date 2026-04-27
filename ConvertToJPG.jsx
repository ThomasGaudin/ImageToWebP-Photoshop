// Script Photoshop pour convertir les images RAF et HEIC (ainsi que d'autres formats) en JPG

#target photoshop

var inputFolder = Folder.selectDialog("Sélectionner un dossier avec des images à convertir en JPG");
var outputFolder = Folder.selectDialog("Sélectionner le dossier où enregistrer les fichiers JPG");

if (inputFolder != null && outputFolder != null) {
    var fileList = inputFolder.getFiles(/\.(jpg|jpeg|png|tif|gif|bmp|psd|raf|heic|webp)$/i); // Ajout des extensions RAF et HEIC

    for (var i = 0; i < fileList.length; i++) {
        var file = fileList[i];
        if (file instanceof File) {
            open(file);

            // Vérification si le document est en mode Camera Raw
            if (app.activeDocument.bitsPerChannel === BitsPerChannelType.THIRTYTWO) {
                // Conversion en 8 bits par canal pour pouvoir enregistrer en JPG
                app.activeDocument.bitsPerChannel = BitsPerChannelType.EIGHT;
            }

            var saveOptions = new JPEGSaveOptions();
            saveOptions.quality = 12; // Qualité maximale (ajustez si nécessaire)

            var outputFile = new File(outputFolder + "/" + file.name.replace(/\.[^\.]+$/, "") + ".jpg");
            app.activeDocument.saveAs(outputFile, saveOptions, true, Extension.LOWERCASE);

            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        }
    }

    alert("Conversion terminée !");
} else {
    alert("Veuillez sélectionner des dossiers valides.");
}
