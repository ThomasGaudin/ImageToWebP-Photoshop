#target photoshop

// Fonction principale
function main() {
    // Demander à l'utilisateur de sélectionner le dossier source
    var inputFolder = Folder.selectDialog("Sélectionnez le dossier contenant les images à convertir.");
    if (inputFolder == null) return;

    // Demander à l'utilisateur de sélectionner le dossier de sortie
    var outputFolder = Folder.selectDialog("Sélectionnez le dossier où enregistrer les images converties.");
    if (outputFolder == null) return;

    // Lister tous les fichiers dans le dossier source
    var fileList = inputFolder.getFiles(/\.(jpg|jpeg|png|tif|tiff|bmp)$/i);
    if (fileList.length == 0) {
        alert("Aucune image trouvée dans le dossier sélectionné.");
        return;
    }

    // Traiter chaque fichier
    for (var i = 0; i < fileList.length; i++) {
        var file = fileList[i];
        if (file instanceof File) {
            open(file);

            // Convertir l'image en niveaux de gris
            convertToGrayscale();

            // Enregistrer l'image en JPG dans le dossier de sortie
            saveAsJPEG(outputFolder);

            // Fermer le document sans enregistrer
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        }
    }
    alert("Conversion terminée !");
}

// Fonction pour convertir une image en niveaux de gris
function convertToGrayscale() {
    var doc = app.activeDocument;
    doc.changeMode(ChangeMode.GRAYSCALE);
}

// Fonction pour enregistrer le document actif en JPG
function saveAsJPEG(outputFolder) {
    var doc = app.activeDocument;
    var fileName = doc.name.replace(/\.[^\.]+$/, '') + "_BW.jpg";
    var saveFile = new File(outputFolder + "/" + fileName);

    var jpgSaveOptions = new JPEGSaveOptions();
    jpgSaveOptions.quality = 12;

    doc.saveAs(saveFile, jpgSaveOptions, true, Extension.LOWERCASE);
}

// Exécuter la fonction principale
main();
