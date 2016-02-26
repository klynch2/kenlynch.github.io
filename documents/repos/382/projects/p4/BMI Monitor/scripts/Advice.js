function advicePage() {
  if (localStorage.getItem("tbRecords") ===
    null) {
    alert("No records exist.");

    $(location).attr("href", "#pageMenu");
  } else {

    var user = JSON.parse(localStorage.getItem(
      "user"));
    var TSHLevel = user;

    var tbRecords = JSON.parse(localStorage.getItem(
      "tbRecords"));
    tbRecords.sort(compareDates);
    var i = tbRecords.length - 1;
    var TSH = tbRecords[i].SynthroidDose;

    var c = document.getElementById(
      "AdviceCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#c0c0c0";
    ctx.fillRect(0, 0, 550, 550);
    ctx.font = "22px Arial";
    drawAdviceCanvas(ctx, TSHLevel, TSH);

  }
}

function drawAdviceCanvas(ctx, TSHLevel, TSH) {
  ctx.font = "22px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Your current BMI is " + TSH +
    ".", 25, 320);

  
    ctx.fillText(
      "Your target BMI range is: 22",
      25, 350);
    levelAwrite(ctx, TSH);
    levelAMeter(ctx, TSH);
  
    
  
}

//For deciding what to write for given values of TSH level A
function levelAwrite(ctx, TSH) {
 if ((TSH >= 18.5) && (TSH <= 24.9)) {
    writeAdvice(ctx, "green");
  } else if ((TSH > 16.01) && (TSH <= 18.49)) {
    writeAdvice(ctx, "yellow");
  } else if ((TSH >= 25) && (TSH < 29)) {
    writeAdvice(ctx, "yellow");
  } else {
    writeAdvice(ctx, "red");
  }
}

function levelBwrite(ctx, TSH) {
  if ((TSH >= 18.5) && (TSH <= 24.9)) {
    writeAdvice(ctx, "green");
  } else if ((TSH > 16.01) && (TSH <= 18.49)) {
    writeAdvice(ctx, "yellow");
  } else if ((TSH >= 25) && (TSH < 29)) {
    writeAdvice(ctx, "yellow");
  } else {
    writeAdvice(ctx, "red");
  }
}

function levelCwrite(ctx, TSH) {
  if ((TSH >= 0.35) && (TSH <= 2.0)) {
    writeAdvice(ctx, "green");
  } else if ((TSH > 2) && (TSH <= 10)) {
    writeAdvice(ctx, "yellow");
  } else if ((TSH >= 0.1) && (TSH < 0.35)) {
    writeAdvice(ctx, "yellow");
  } else {
    writeAdvice(ctx, "red");
  }
}

function writeAdvice(ctx, level) {
  var adviceLine1 = "";
  var adviceLine2 = "";

  if (level == "red") {
    adviceLine1 =
      "Please consult with your family";
    adviceLine2 = "physician urgently.";
  } else if (level == "yellow") {
    adviceLine1 =
      "Contact family physician ";
    adviceLine2 = "soon";
  } else if (level = "green") {
    adviceLine1 =
      "your BMI is great!";
  }
  ctx.fillText("Your BMI is " + level +
    ".", 25, 380);
  ctx.fillText(adviceLine1, 25, 410);
  ctx.fillText(adviceLine2, 25, 440);
}

function levelAMeter(ctx, TSH) {
 
    var cg = new RGraph.CornerGauge(
        "AdviceCanvas", 10, 35, TSH)
      .Set("chart.colors.ranges", [
        [10, 16, "red"],
        [16.01, 18.49, "yellow"],
        [18.5, 24.9, "#0f0"],
        [25, 29.99, "yellow"],
         [30, 35, "red"]
      ]);
  
  
  drawMeter(cg);
}


// Meter properties
function drawMeter(g) {
  g.Set("chart.value.text.units.post", " mlU/L")
    .Set("chart.value.text.boxed", false)
    .Set("chart.value.text.size", 14)
    .Set("chart.value.text.font", "Verdana")
    .Set("chart.value.text.bold", true)
    .Set("chart.value.text.decimals", 2)
    .Set("chart.shadow.offsetx", 5)
    .Set("chart.shadow.offsety", 5)
    .Set("chart.scale.decimals", 2)
    .Set("chart.title", "TSH LEVEL")
    .Set("chart.radius", 250)
    .Set("chart.centerx", 50)
    .Set("chart.centery", 250)
    .Draw();
}