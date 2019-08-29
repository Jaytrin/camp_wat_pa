$(document).ready(initializeApp);


function initializeApp(){
    console.log('running');
    getData();
}

function getData(){
    var families_array = [];
    var ajaxConfig = {
        dataType: 'json',
        url: 'http://localhost:8888/app.php/?request=get_data',
        method: 'get',
        success: 
            function(json){
                for(var i = 0; i < json.length; i++){
                    var family = {
                        name: json[i]['name'],
                        money: json[i]['money'],
                        energy: json[i]['energy'],
                        happiness: json[i]['happiness']
                    }
                    families_array.push(family);
                }
                return renderFamilyData(families_array);
            },
        error: function(){
            console.log('error running ajax');
        }   
        }
    $.ajax(ajaxConfig);
}

function renderFamilyData(family_array){
    for(var i = 0, u = 1; i < family_array.length + 1; i++,u++){
        var moneyIcon = addIconImage('money');
        var energyIcon = addIconImage('energy');
        var happinessIcon = addIconImage('happiness'); 

        var moneyProgressBar = addProgressBar(family_array[i].money, 'money');
        var energyProgressBar = addProgressBar(family_array[i].energy, 'energy');
        var happinessProgressBar = addProgressBar(family_array[i].happiness, 'happiness');

        var moneyRow = $('<div>').addClass('row justify-content-center').append(moneyIcon, moneyProgressBar);
        var energyRow = $('<div>').addClass('row justify-content-center').append(energyIcon, energyProgressBar);
        var happinessRow = $('<div>').addClass('row justify-content-center').append(happinessIcon, happinessProgressBar);

        var familyContainer = $(`<div class='family-container text-center mb-4 ml-5 mr-5'>
                                    <div class='progress-container'>
                                    </div>
                                </div>`);
        var familyNameHeader = $('<h6>').text(family_array[i].name);
        familyContainer.prepend(familyNameHeader);
        familyContainer.children('.progress-container').append(moneyRow, energyRow, happinessRow);
        $('#families-container-' + (u % 3)).append(familyContainer);
    }
}

function applyBarColors(value, type){
    value = parseInt(value);
    var color = null;
    if(value <= 10){
        color = type + '-red';
    } else if (value <=30){
        color = type + '-yellow';
    } else if (value < 90){
        color = type + '-green';
    } else if (value >= 90){
        color = type + '-blue'
    }
    return color;
}

function addProgressBar(barData, type){
    var barProgressColContainer = $('<div>').addClass('col-8');
    var barProgressContainer = $('<div>').addClass('progress p-0');
    var bar = $('<div>').addClass('progress-bar' + ' bg-' + type).attr({
        'style' : "width: " + barData + '%',
        'role' : "progressbar",
        'aria-valuenow' : "" + barData,
        'aria-valuemin' : "0",
        'aria-valuemax' : "100"
    });
    barProgressContainer.append(bar);
    barProgressColContainer.append(barProgressContainer);
    return barProgressColContainer;
}

function addIconImage(type){
    var iconImage = null;

    switch(type){
        case 'money':
        iconImage = 'text-center align-top fas fa-money-bill text-success';
        break;
        case 'energy':
        iconImage = 'text-center align-top fas fa-bolt text-primary';
        break;
        case 'happiness':
        iconImage = 'text-center align-top fas fa-smile text-warning';
        break;
        default:
        break;
    }

    var iconContainer = $(`<div class="col-1 text-center"></div>`);
    var icon = $('<span>').addClass(iconImage);
    iconContainer.append(icon);

    return iconContainer;
}