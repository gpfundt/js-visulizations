function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
  d3.json("samples.json", function(mdata){
    console.log(mdata.names);
  var samples = d3.selectAll("#sample-metadata")
  // console.log(samples);

    // Use `.html("") to clear any existing metadata
    samples.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    mdata.forEach(function(data) {
      var row = samples.append("tr");
      Object.entries(data).forEach(function([key, value]) {
        //console.log(key, value);
        var cell = row.append("td");
        cell.text(value);
      });
    });

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
  });
}

function buildCharts(sample) {
    console.log(sample);

    var values = sample.sample_values
    var text = sample.otu_ids
    var labels = sample.otu_labels

    var trace1 = {
      labels: labels.slice(0,9),
      values: values.slice(0,9),
      text: text.slice(0,9),
      type: 'pie'
    };
    var layout = {
      title: "Pie BBtn",
    };

    Plotly.newPlot("pie", [trace1], layout);
    
  // @TODO: Build a Bubble Chart using the sample data

  };

    


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then(function(mdata) {
    var sampleNames = mdata.names
    // console.log(sampleNames);
    sampleNames.forEach(sample => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = mdata.samples[0]
    console.log(firstSample)
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
  }
}
// Initialize the dashboard
init();
