$(document).ready(function () {
    $('.start').addClass('active');
    $('#nickname').on('input',function(){
        if($(this).val()==''){
            $('#start_button').prop('disabled',true)
        }else{
            $('#start_button').removeAttr('disabled');
        }

    })
    $('#start_button').click(function(){
        setInterval(startTimer,1000);
        let nickname=$('#nickname').val();
        $('div').removeClass('active');
        $('.game').addClass('active');
        $('#name_player').html(nickname);
    
        game();
    })
    $('#restart').click(()=>{
        player.x=0;
        player.y=0;
        // player.step=0;
        game();
        console.log(game);
    })

});

let player={
    el:false,
    x:0,
    y:0,
    step:64,
    width:64,
    height:64
};

function game() {

    $('.game_zone').append(`<div class="" id="player" style="top:${player.y}px;left:${player.x}px"></div>`);
    player.el=document.getElementById('player');
    generateLvl();
    controller();
    
}

function controller(e){
    $(document).keydown(function (e) { 
        switch (e.keyCode) {
           
            case 87:
            if(player.y>16){
                player.y-=player.step;
                player.el.style.top=`${player.y}px`
               
            } 
            
            break;           
            //  Вниз
            case 83:

                if(player.y<gameZone.getBoundingClientRect().height-player.height*2.5){
                    player.y += player.step;
                    player.el.style.top = `${player.y}px`;
                   
                }
               
                break;

            //Влево
            case 65:
                if(player.x>0){
                    player.x-=player.step;
                    player.el.style.left=`${player.x}px` 
                }
               
                break;
            //Право
            case 68:
                if(player.x<gameZone.getBoundingClientRect().right-player.width){
                    player.x+=player.step;
                    player.el.style.left=`${player.x}px`
                   
                }
                break;
        
            
        }
    });
}
function generateLvl() { 
    let xx=Math.round((gameZone.getBoundingClientRect().height-player.height)/64);
    let yy=Math.round((gameZone.getBoundingClientRect().width-player.height)/64)+1;
    // console.log(Math.round((xx*yy)/(64*64)));
    var stone=0;
    var heart=1;
    var lvl=[];
    for (let index = 0; index <xx*yy; index++) {
    var run=Math.floor(Math.random()*70+1);
    lvl.push(run);
        if(run<=1){
            $('.game_zone').append(`<img src="img/ground.png" class="field" alt="">`);
        }
        else if(run==2){
            if(heart<=10){
                $('.game_zone').append(`<img src="img/heart-in-stone.svg" class="heart" alt="">`);
                heart++;
            }else{
                $('.game_zone').append(`<img src="img/ground.png" class="field" alt="">`);
            }
            
        }
        else if(run==3){
            if(stone<=30){
                $('.game_zone').append(`<img src="img/stone.png" class="stone" alt="">`);
                stone++;
            }else{
                $('.game_zone').append(`<img src="img/ground.png" class="field" alt="">`);
            }
        }else{
            $('.game_zone').append(`<img src="img/ground.png" class="field" alt="">`); 
        }
        
       
    }
}



let second=00,
    minute=00;
function startTimer(){
    second++;
    if(second<=9){
       second="0"+second;
      
    }
    
    if(second==60){
        minute++;
        second="0"+0;
    }
    time=minute+":"+second;
    $('#timer').html(time);
}
let gameZone=document.querySelector('.game_zone');