<?php
sleep(2);
session_start();
$code = $_GET['code'];
$ach = $_GET['ach'];

if(!empty($code)){
	$save = explode(':', $code);
	$sid = $save[0];//id юзера
	$ep1 = $save[1];
	$ep2 = $save[2];
	$ep3 = $save[3];
	$ep4 = $save[4];
	$ep5 = $save[5];
	$ep6 = $save[6];
	
	if(array_search(0, $save) > 1){
		$epid = array_search(0, $save)-1;
		
	}
	else{
		$epid = 1;
	}
		
		$_SESSION['code'] = $code;
		header("Location: episode".$epid);
		exit;
}
if(!empty($ach)){
	switch($ach){
		case 'c7763203':
			$_SESSION['ach'] = '0-0';
			break;
		case 'c2eb2821':
			$_SESSION['ach'] = '0-1';
			break;
		case 'dfbffab0':
			$_SESSION['ach'] = '0-2';
			break;
	}

}

?>
<!DOCTYPE html>
<html data-app='{"modules":["index"],"index":1}'>
    <head>
		<meta charset="utf-8" />
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
<title>1 серия. Откажись</title>
<meta name="Keywords" content="интерактивный сериал, веб-сериал, веб сериал, эко сериал, смотреть веб сериал, как сортировать мусор, как сортировать отходы" />
<meta name="Description" content="Развлекательно-познавательный интерактивный сериал, благодаря которому у каждого появится возможность почувствовать себя супер-героем. Вместе с персонажами сериала Вам предстоит очистить город от мусора и зла." />
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="maximum-scale=1.0,user-scalable=0">
<!--<link rel="stylesheet" href="css/style.min.css" />-->
<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>-->
<script>window.jQuery||document.write('<script src="js/lib/jquery.js">\x3C/script>')</script>
         <link href="css/video-js.min.css" rel="stylesheet">
<link rel="stylesheet" href="css/style.css" />
<!--<link rel="stylesheet" href="css/style.min.css">-->
<script src="js/lib/pack/0underscore.min.js"></script>
<script src="js/lib/pack/backbone.min.js"></script>
<script src="js/lib/pack/event.js"></script>
<script src="js/lib/pack/imagesloaded.js"></script>
<script src="js/lib/pack/lottie.min.js"></script>
<script src="js/lib/pack/video.min.js"></script>
<script src="js/lib/pack/videojs-quality-selector.min.js"></script>
<script src="js/lib/pack/jquery.qrcode.min.js"></script>
<script src="js/app.js" type="module"></script>
<!--<script src="js/built-min.js"></script>-->
<!--<script src="js/built.min.js"></script>-->
<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(85710322, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/85710322" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
<script>
var adcm_config ={
  id: 7399,
  platformId: 990,
  profileId: '${USER_ID}',
  init: function () { window.adcm.call(); }
};
</script>
<script src='https://tag.digitaltarget.ru/adcm.js' async></script>

	</head>
	<body>
    <!-- Yandex.Metrika counter -->
    <!--<script type="text/javascript" >
     (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
     (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

     ym(68233750, "init", {
      clickmap:true,
      trackLinks:true,
      accurateTrackBounce:true
     });
    </script>
    <noscript><div><img src="https://mc.yandex.ru/watch/68233750" style="position:absolute; left:-9999px;" alt="" /></div></noscript>-->
    <!-- /Yandex.Metrika counter -->
		<div id="wrap">
			<div class="player-wrap">
                <video playsinline
                       class="video-js"
                       controls>
                    <p class="vjs-no-js">
                        To view this video please enable JavaScript, and consider upgrading to a
                        web browser that
                        <a href="https://videojs.com/html5-video-support/" target="_blank">
                            supports HTML5 video
                        </a>
                    </p>
                </video>
            </div>
			<div class="overlay-block">
                <div class="ov-wrap learn">
                    <div class="ov-inner">
                        <div class="bg-img"></div>
                        <div class="ov-cont">
                            <div class="h-b-h">Добро пожаловать!</div>
                            <div class="h-b-text">
                                Интерактивное повествование — совсем новый формат развлечений.<br/>
                                Часто пользователи сталкиваются с новыми и непривычными элементами управления.
                                <br/>
                                <br/>
                                Мы очень рекомендуем посмотреть небольшое обучение о том, как тут все работает.
                                <br/>
                                <div class="start">Начать знакомство с элементами управления →</div>
                                <br/>
                                <div class="skip">я все знаю, начать просмотр</div>
                            </div>
                        </div>
                    </div>
                    <div class="ov-inner">
                        <div class="bg-img" style="background-image: url(https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/learn/study-bg1.jpg);"></div>
                        <div class="ov-cont">
                            <div class="l-text">Внутри наш взгляд на игру, в которую играли твои предки, а может быть, даже ты. Смотри, чтобы олдскулы не свело и не забудь найти пасхалку.</div>
                            <div class="l-text">Внутри ты найдешь полезную эко-инфу, сможешь почитать про героев сериала, сохранить-загрузиться и поразглядывать свои ачивки.</div>
                            <div class="the-btn"><span>Дальше &rarr;</span></div>
                        </div>
                    </div>
                    <div class="ov-inner">
                        <div class="bg-img" style="background-image: url(https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/learn/study-bg2.jpg);"></div>
                        <div class="ov-cont">
                            <div class="h-b-h">Изучай</div>
                            <div class="l1-text">Получай достижения смотря сериал, несколько самых секретных можно найти только у партнёров проекта.</div>
                            <div class="l1-text">Открывай полезные знания вместе с героями сериала. <br/><br/></div>
                            <div class="the-btn"><span>Дальше &rarr;</span></div>
                        </div>
                    </div>
                    <div class="ov-inner">
                        <div class="bg-img"></div>
                        <div class="ov-cont save">
                            <div class="h-b-h">Твой прогресс</div>
                            <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/learn/save.png" alt="" class="save-img"/>
                            <div class="h-b-text last">
                                При просмотре с одного и одного же устройства данные сохраняются в вашем браузере,
                                но при переходе на другое устройство вы также можете продолжить ваш прогресс прохождения,
                                используя личный код или qr-код.
                            </div>
                            <div class="the-btn"><span>Поехали &rarr;</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="special-btns"><div class="inner"></div></div>
<div class="info-pop">
    <div class="caller"></div>
    <div class="inner">
        <div class="lottie"></div>
        <div class="tabs">
            <div><span>Сохранение</span></div>
            <div><span>Загрузка</span></div>
            <div><span>Достижения</span></div>
            <div><span>Персонажи</span></div>
            <div><span>Полезные статьи</span></div>
        </div>
        <div class="content">
            <div class="top">
                <div class="block">
                    <div class="h">Сохранение</div>
                    <div class="desc">
                        Ваши данные переработаны в личный код.<br/>
                        Введите его, когда захотите продолжить с того же места на любом устройстве.
                    </div>
                </div>
                <div class="block">
                    <div class="h">Загрузка</div>
                    <div class="desc">
                        Ваши данные переработаны в личный код.<br/>
                        Введите его, когда захотите продолжить с того же места на любом устройстве.
                    </div>
                </div>
                <div class="block">
                    <div class="h">Достижения (<span class="ach-ctr"></span>)</div>
                    <div class="desc">На этой странице отмечаются твои эко-достижения</div>
                </div>
                <div class="block">
                    <div class="h">Персонажи</div>
                    <div class="desc">Здесь собрана вся информация о персонажах</div>
                </div>
                <div class="block">
                    <div class="h">Полезные статьи</div>
                    <div class="desc">Полезные статьи о принципах ответственного потребления и особенностях сортировки.</div>
                </div>
            </div>
            <div class="container">
                <div class="t-scroll-wrap">
                    <div class="t-scroll-inner">
                        <div class="block">
                            <div class="the-code">
                                <div class="code"><span></span></div>
                                <input type="text" class="code-hidden"/>
                                <div class="the-btn copy">скопировать код<br/>в буфер обмена</div>
                            </div>
                            <div class="or-copy">
                                Или вы можете схоранить себе qr-код и воспользоваться сканером на устройстве.
                            </div>
                            <a href="" class="save">Сохранить файл с кодом</a>
                            <div class="qr"></div>
                        </div>
                        <div class="block">
                            <div class="the-code">
                                <input placeholder="Введите ваш код" type="text" class="code-input"/>
                                <div class="the-btn go">Загрузить</div>
<!--                                <div class="err-text"></div>-->
                            </div>
                        </div>
                        <div class="block achievements">
                        
                        </div>
                        <div class="block">
                            <div class="pers-item">
                                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/info-pop/denis.jpg" alt="" class="pers-img"/>
                                <div class="pers-text">
                                    <div class="pers-h">Денис Васильев</div>
                                    Программист на удаленке в крупной компании. Много работает, ведет здоровый образ жизни и относится ко всему с юмором.
                                </div>
                            </div>
                            <div class="pers-item">
                                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/info-pop/olga.jpg" alt="" class="pers-img"/>
                                <div class="pers-text">
                                    <div class="pers-h">Ольга Васильева</div>
                                    Учительница русского языка и литературы в средней школе. Добрая, отзывчивая, мечтательная натура. Хочет изменить мир к лучшему.
                                </div>
                            </div>
                            <div class="pers-item">
                                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/info-pop/sp.jpg" alt="" class="pers-img"/>
                                <div class="pers-text">
                                    <div class="pers-h">Степан Петрович</div>
                                    Опытный инженер в местном научно-исследовательском институте. Уставший от жизни, но известный и уважаемый человек в доме, где живут Денис и Ольга.
                                </div>
                            </div>
                            <div class="pers-item">
                                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/info-pop/vi.jpg" alt="" class="pers-img"/>
                                <div class="pers-text">
                                    <div class="pers-h">Вика</div>
                                    Подруга Ольги. Успешная дизайнерка интерьеров в крупном архитектурном бюро. Самостоятельная и самодостаточная девушка. В глубине души мечтает о большой и светлой любви, но редко в этом признается.
                                </div>
                            </div>
                            <div class="pers-item">
                                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/info-pop/ii.jpg" alt="" class="pers-img"/>
                                <div class="pers-text">
                                    <div class="pers-h">Иван Иванович</div>
                                    Отец Дениса. Получает удовольствие от чистоты во дворе, но не верит, что усилия одного или нескольких человек могут изменить мир.
                                </div>
                            </div>
                            <div class="pers-item">
                                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/info-pop/mi.jpg" alt="" class="pers-img"/>
                                <div class="pers-text">
                                    <div class="pers-h">Миша</div>
                                    Самый активный ученик в одном из классов Ольги. Подвижный и смышленый. Всегда готов прийти на помощь и организовать остальных.
                                </div>
                            </div>
                            <div class="pers-item">
                                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/info-pop/va.jpg" alt="" class="pers-img"/>
                                <div class="pers-text">
                                    <div class="pers-h">Ваня</div>
                                    Внук Степана Петровича и одноклассник Миши. Поддерживает Мишу в его желании изменить мир к лучшему.
                                </div>
                            </div>
                        </div>
                        <div class="block articles">
                            <div class="extra">
                                <div class="e-cont">
                                    <div class="e-h">ПРОДОЛЖАЙ ПРОСМОТР</div>
                                    Узнай много нового вместе с Ольгой и Денисом
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="t-scroll-bar"><div></div></div>
            </div>
        </div>
    </div>
</div>
<div class="full-article-pop">
    <div class="bg"></div>
    <div class="content">
        <div class="container">
            <div class="t-scroll-wrap">
                <div class="t-scroll-inner">
                
                </div>
            </div>
            <div class="t-scroll-bar"><div></div></div>
        </div>
        <div class="close"></div>
        <div class="back"><span>Вернуться</span></div>
        <div class="more"><span>Больше карточек</span></div>
    </div>
</div>
<div class="game-pop">
    <div class="caller"><span></span></div>
    <div class="inner">
        <div class="block">
            <div class="choose">
                <div>Денис</div>
            </div>
            <div class="choose">
                <div>Ольга</div>
            </div>
            <div class="secret"></div>
            <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/g-select-l.svg" alt="" class="ch-hover"/>
            <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/g-select-r.svg" alt="" class="ch-hover"/>
            <div class="ch-text"><span>Выбери персонажа</span></div>
            <div class="ch-text">
                <div class="ch-t-item">
                    Лови падающий мусор.<br/>
                    Попускаешь мусор — теряешь жизни, их всего 3.
                </div>
                <div class="ch-t-item">
                    Используй кнопки приставки<br/>
                    или AZKM на клавиатуре.
                </div>
            </div>
        </div>
        <div class="block">
            <div class="game">
                <img class="g-bg" src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/base.jpg" alt=""/>
                <img class="g-bg" src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/man.png" alt=""/>
                <img class="g-bg" src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/base.jpg" alt=""/>
                <img class="g-bg" src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/secret.png" alt=""/>
                <div class="g-close"></div>
                <img class="g-btn" src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/btn-off.png" alt=""/>
                <div class="g-ctrl lu"></div>
                <img class="g-btn" src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/btn-lu.png" alt=""/>
                <img class="g-hand" src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/hand-lu.svg" alt=""/>
                <div class="g-ctrl ru"></div>
                <img class="g-btn" src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/btn-ru.png" alt=""/>
                <img class="g-hand" src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/hand-ru.svg" alt=""/>
                <div class="g-ctrl rd"></div>
                <img class="g-btn" src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/btn-rd.png" alt=""/>
                <img class="g-hand" src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/hand-rd.svg" alt=""/>
                <div class="g-ctrl ld"></div>
                <img class="g-btn" src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/btn-ld.png" alt=""/>
                <img class="g-hand" src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/hand-ld.svg" alt=""/>
                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/g-lu-0.svg" alt="" class="g-g lu"/>
                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/g-lu-1.svg" alt="" class="g-g lu"/>
                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/g-lu-2.svg" alt="" class="g-g lu"/>
                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/g-lu-3.svg" alt="" class="g-g lu"/>
                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/g-lu-4.svg" alt="" class="g-g lu"/>
                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/g-ru-0.svg" alt="" class="g-g ru"/>
                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/g-ru-1.svg" alt="" class="g-g ru"/>
                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/g-ru-2.svg" alt="" class="g-g ru"/>
                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/g-ru-3.svg" alt="" class="g-g ru"/>
                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/g-ru-4.svg" alt="" class="g-g ru"/>
                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/g-rd-0.svg" alt="" class="g-g rd"/>
                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/g-rd-1.svg" alt="" class="g-g rd"/>
                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/g-rd-2.svg" alt="" class="g-g rd"/>
                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/g-rd-3.svg" alt="" class="g-g rd"/>
                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/g-rd-4.svg" alt="" class="g-g rd"/>
                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/g-ld-0.svg" alt="" class="g-g ld"/>
                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/g-ld-1.svg" alt="" class="g-g ld"/>
                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/g-ld-2.svg" alt="" class="g-g ld"/>
                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/g-ld-3.svg" alt="" class="g-g ld"/>
                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/g-ld-4.svg" alt="" class="g-g ld"/>
                <div class="score in-game">
                    <div class="s-digits">
                        <div class="s-d-inner"></div>
                    </div>
                </div>
                <div class="lives">
                    <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/icon-heart.svg" alt=""/>
                    <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/icon-heart.svg" alt=""/>
                    <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/game/icon-heart.svg" alt=""/>
                </div>
            </div>
        </div>
        <div class="block">
            <div class="score best">
                <div class="s-h">Лучший среди всех игроков</div>
                <div class="s-digits">
                    <div class="s-d-inner"></div>
                </div>
            </div>
            <div class="score curr">
                <div class="s-h">Твой результат</div>
                <div class="s-digits">
                    <div class="s-d-inner"></div>
                </div>
            </div>
            <div class="the-btn">Сыграть еще раз</div>
        </div>
    </div>
</div>
<div class="start-pop">
    <div class="logo"></div>
    <div class="wrap">
        <div class="start play">
            <div>
                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/startscreen-btn.svg" alt=""/>
                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/startscreen-btn-h.svg" alt=""/>
                <span>Смотреть</span>
            </div>
            <div>
                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/startscreen-btn.svg" alt=""/>
                <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/startscreen-btn-h.svg" alt=""/>
                <span>Продолжить</span>
            </div>
        </div>
        <div class="start load">
            <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/startscreen-btn-h.svg" alt=""/>
            <img src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/startscreen-btn.svg" alt=""/>
            <span>Загрузить</span>
        </div>
    </div>
    <div class="pane"></div>
</div>
<div class="loader-pop">
    <div class="l"></div>
</div>
<div class="achievement-pop">
    <div class="into"></div>
</div>
<div class="article-pop">
    <div class="into"></div>
</div>
<div class="orientation-pop">
    <div class="text">
        Поверните устройство в горизонтальное положение или используйте компьютер.
    </div>
</div>

<div class="server-test"></div>
		</div>

    <script type="text/template" id="info-ach-template">
    <% for(let i=0;i<achievements.length;i++){ %>
    <div class="ach-item<%= achievements[i].disabled?' disabled':'' %>">
        <img class="ach-img" src="<%= achievements[i].img %>" />
        <div class="ach-text">
            <div class="ach-h"><%= achievements[i].h %></div>
            <%= achievements[i].text %>
        </div>
    </div>
    <% } %>
</script>
<script type="text/template" id="achievement-template">
    <img class="img" src="<%= img %>" />
    <div class="inner">
        <div class="h"><%= h %></div>
        <div class="text"><%= text %></div>
    </div>
</script>
<script type="text/template" id="info-art-template">
    <% for(let i=0;i<articles.length;i++){ %>
    <div class="article-item<%= articles[i].disabled?' disabled':'' %>">
        <img src="<%= articles[i].bg %>" alt="" class="a-bg"/>
        <div class="a-cont">
            <div class="a-h"><span><%= articles[i].h %></span></div>
            <div class="a-text"><%= articles[i].text %></div>
        </div>
        <img src="<%= articles[i].icon %>" alt="" class="a-icon"/>
    </div>
    <% } %>
</script>
<script type="text/template" id="article-template">
    <div class="article-item">
        <img src="<%= bg %>" alt="" class="a-bg"/>
        <div class="a-cont">
            <div class="a-h"><span><%= h %></span></div>
            <div class="a-text"><%= text %></div>
        </div>
        <img src="<%= icon %>" alt="" class="a-icon"/>
    </div>
</script>
<script type="text/template" id="full-article-template">
    <div class="h"><span><%= h %></span></div>
    <%= pop %>
</script>
<script type="text/template" id="ext-player-template">
    <input type="checkbox" />
    <img class="icon" src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/notadump/images/icons/icon-bookmark.svg" alt=""/>
    <div class="step-btns">
        <% for(let i=0;i<choose.length;i++){ %>
        <div class="int-ind-back<%= choose[i]?' enabled':' ' %>"><span><%= i+1 %></span></div>
        <% } %>
    </div>
</script>
	</body>
</html>