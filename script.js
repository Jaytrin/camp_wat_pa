$(document).ready(initializeApp);

function initializeApp(){
    console.log('running');
    getData();
    setTimeout(animateProgressBars,1000);
    updateButtonHandler();
    loginBtnHandler();
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
    for(var i = 0, u = 1; i < family_array.length; i++,u++){
        var moneyIcon = addIconImage('money');
        var energyIcon = addIconImage('energy');
        var happinessIcon = addIconImage('happiness'); 

        var moneyProgressBar = addProgressBar(family_array[i].money, 'money');
        var energyProgressBar = addProgressBar(family_array[i].energy, 'energy');
        var happinessProgressBar = addProgressBar(family_array[i].happiness, 'happiness');

        var moneyRow = $('<div>').addClass('row justify-content-center').append(moneyIcon, moneyProgressBar);
        var energyRow = $('<div>').addClass('row justify-content-center').append(energyIcon, energyProgressBar);
        var happinessRow = $('<div>').addClass('row justify-content-center').append(happinessIcon, happinessProgressBar);

        var familyContainer = $(`<div class='family-container text-center mb-4 ml-2 mr-2'>
                                    <div class='progress-container'>
                                    </div>
                                </div>`);
        var familyColor = (family_array[i].name).toLowerCase();
        familyContainer.addClass(familyColor + '-background');

        var familyNameHeader = $('<h6>').text(family_array[i].name + ' Family');
        familyContainer.prepend(familyNameHeader);
        familyContainer.children('.progress-container').append(moneyRow, energyRow, happinessRow);
        $('#families-container-' + (u % 3)).append(familyContainer);
    }
}

function addProgressBar(barData, type){
    var barProgressColContainer = $('<div>').addClass('col-8');
    var barProgressContainer = $('<div>').addClass('progress p-0');
    var bar = $('<div>').addClass('progress-bar' + ' bg-' + type).attr({
        'width': "0",
        'role' : "progressbar",
        'aria-valuenow' : "" + barData,
        'aria-valuemin' : "0",
        'aria-valuemax' : "100"
    });
    if(barData <= 10){
        bar.css({'background-color':'red'})
    }

    barProgressContainer.append(bar);
    barProgressColContainer.append(barProgressContainer);
    return barProgressColContainer;
}

function addIconImage(type){
    var iconImage = null;

    switch(type){
        case 'money':
        iconImage = 'text-center align-top fas fa-money-bill';
        break;
        case 'energy':
        iconImage = 'text-center align-top fas fa-bolt';
        break;
        case 'happiness':
        iconImage = 'text-center align-top fas fa-smile';
        break;
        default:
        break;
    }

    var iconContainer = $(`<div class="col-1 text-center"></div>`);
    var icon = $('<span>').addClass(iconImage);
    iconContainer.append(icon);

    return iconContainer;
}

function animateProgressBars(){
    $('.progress .progress-bar').css({"width": 0});

    $('.progress .progress-bar').each(function(){
        $(this).css({
            "width": function() {
            return $(this).attr("aria-valuenow") + "%";
          }, 
          'transition-duration': '2s',
          'transition-timing-function': 'ease-out'})})
}

function updateButtonHandler(){
    $('#updateBtn').on('click',function(){
        clearFamilyContainers();
        getData();
        setTimeout(animateProgressBars,1000);
    })
}

function clearFamilyContainers(){
    $('#families-container-0').empty();
    $('#families-container-1').empty();
    $('#families-container-2').empty();
}

function loginBtnHandler(){
    $('#loginBtn').con('click',function(){
        var ajaxConfig = {
            dataType: 'json',
            url: 'http://localhost:8888/app.php/?request=login',
            method: 'get',
            success: 
                function(){
                    console.log('login script reached');
                },
            error: function(){
                console.log('error running login');
            }   
            }
        $.ajax(ajaxConfig);
    })
}
