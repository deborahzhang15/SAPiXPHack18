$(function () {

    var url = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/615316ed-3ffb-4668-8c32-cd7349505cd6/image?iterationId=2ca231fc-ee9c-4cbb-9047-745f6eade22a"
    var predictionKey = "302de25dba5a4cb0a8733f866fa754e8";
    
    var fs = require("fs");
    var _ = require('underscore');

    // Store the value of a selected image for display
    var imageBytes;
    // Handle clicks of the Browse (...) button
    $("#select_button").click(function () {

        $('#analysisResults').html('');
        $('#analyze_button').prop('disabled', true);

        const electron = require('electron');
        const dialog = require('electron').dialog;

        var va = electron.remote.dialog.showOpenDialog();

        var contents = fs.readFileSync(va[0], "base64");
        imageBytes = fs.readFileSync(va[0]);

        $('#previewImage').html('<img width="240" src="data:image/png;base64,' + contents + '" />');
        $('#analyze_button').prop('disabled', false);

    });

    // Handle clicks of the Analyze button
    $("#analyze_button").click(function () {
        $.ajax({
            type: "POST",
            url: url,
            data: imageBytes,
            processData: false,
            headers: {
                "Prediction-Key": predictionKey
            },
            success: function(data) {
                var predictions = data.predictions;
                var tagOrder = [predictions.find(o => o.tagName === 'Recycling'), predictions.find(o => o.tagName === 'Compost'),  predictions.find(o => o.tagName === 'Garbage'), predictions.find(o => o.tagName === 'Non-compostable')];
                var tagOrders = _.sortBy(tagOrder, 'probability').reverse();
                var possibleBin = tagOrders[0];
    
                if (possibleBin.probability > .5) {
                    $('#analysisResults').html('<div class="matchLabel">' + possibleBin.tagName + ' (' + (possibleBin.probability * 100).toFixed(0) + '%)' + '</div>');
                }
                else {
                    $('#analysisResults').html('<div class="noMatchLabel">Unknown Item</div>');
                }
            },
            error: function(data, textStatus, errorThrown) {
                alert("Oh no! Something went wrong, please try another image.")
                // alert(JSON.stringify(data));
            }
        })

        $('#analyze_button').prop('disabled', true);
    });

});


