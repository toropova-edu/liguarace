addWeek('bogdan', {
t: 'Кино, ТВ и новости', e: '🎬', g: 'Пассивный залог (Passive Voice)',
tip: 'Passive = be (am/is/are/was/were) + V3. Важно действие, а не кто его делает: The film was made in 2019. Исполнитель — через by: written by Tolstoy. Present: is made, Past: was made.',
l: `<p><b>Passive</b> = <b>be + V3</b>. Используем, когда важен результат или исполнитель неизвестен.</p>
<div class="ex"><b>Present:</b> English <b>is spoken</b> in many countries.<br><b>Past:</b> The film <b>was made</b> in 2019. · These houses <b>were built</b> in 1900.<br><b>Вопрос:</b> <b>Was</b> it <b>written</b> by Tolstoy? · <b>Отрицание:</b> It <b>wasn't published</b>.</div>
<p>Кто сделал — через <b>by</b>: War and Peace <b>was written by</b> Tolstoy.</p>
<p>Полезно: <b>be born</b> (родиться) — I <b>was born</b> in 1995. <b>be called</b> — The film <b>is called</b> «Titanic».</p>`,
v: `newspaper=газета; magazine=журнал; article=статья; headline=заголовок; news=новости; channel=канал; programme=программа; series=сериал; episode=серия; documentary=документальный фильм; comedy=комедия; horror=фильм ужасов; thriller=триллер; cartoon=мультфильм; actor=актёр; actress=актриса; director=режиссёр; character=персонаж; plot=сюжет; scene=сцена; ending=концовка; review=отзыв, рецензия; advertisement=реклама; celebrity=знаменитость; publish=публиковать; produce=производить; be made of=быть сделанным из; be built=быть построенным; be born=родиться; be called=называться; broadcast=транслировать; audience=зрители; subtitles=субтитры; remote control=пульт`,
x: `c|English ___ in many countries.|is spoken|speaks,spoke
c|The film ___ in 2019.|was made|made,is made
c|These houses ___ in 1900.|were built|was built,built
c|The letter ___ yesterday. (было отправлено)|was sent|sent,is sent
c|War and Peace was written ___ Tolstoy.|by|from,with
c|I ___ in 1995. (родился)|was born|born,am born
c|The newspapers ___ every day. (публикуются)|are published|publish,published
t|The cake ___ by my mother. (to make — Past)|was made
t|Cars ___ in this factory. (to produce — Present)|are produced
t|The film ___ not finished last year. (was/were)|was
o|Этот фильм был снят в Америке.|This film was made in America.
o|Эти газеты читают во всём мире.|These newspapers are read all over the world.`
});

addWeek('bogdan', {
t: 'Деньги и банк', e: '💳', g: 'Too / enough, so / such',
tip: 'too + прилагательное = слишком (too expensive). adj + enough = достаточно (big enough). enough + сущ. (enough money). so + прилаг. (so cheap); such + (a/an) + прилаг. + сущ. (such a nice day).',
l: `<p><b>too</b> — слишком (плохо): The jacket is <b>too</b> expensive. I'm <b>too</b> tired.<br><b>enough</b> — достаточно: <b>enough</b> money, big <b>enough</b>, not warm <b>enough</b>.</p>
<div class="ex">прилагательное + <b>enough</b> (warm <b>enough</b>)<br><b>enough</b> + существительное (<b>enough</b> time)<br><b>too</b> + прилагательное (<b>too</b> cold)</div>
<p><b>so + прилагательное</b>: It's <b>so</b> cheap! <b>such + (a) прилагательное + существительное</b>: It's <b>such a</b> cheap bag!</p>
<p>Деньги: <b>borrow</b> (взять в долг) — <b>lend</b> (дать в долг). <b>afford</b>: I can't <b>afford</b> it.</p>`,
v: `bank account=банковский счёт; credit card=кредитная карта; cash machine=банкомат; borrow=занимать (брать в долг); lend=одалживать (давать в долг); owe=быть должным; save up=копить; spend=тратить; waste=тратить впустую; afford=позволить себе; worth=стоящий; budget=бюджет; debt=долг; loan=кредит; interest=проценты; currency=валюта; exchange=обмен; rate=курс; pound=фунт; dollar=доллар; euro=евро; coin=монета; note=банкнота; tax=налог; income=доход; expenses=расходы; pension=пенсия; wealthy=состоятельный; pay back=возвращать долг; enough=достаточно; too=слишком; cheap=дешёвый; expensive=дорогой; invest=инвестировать; price=цена; cost=стоить`,
x: `c|This jacket is ___ expensive. I can't buy it.|too|enough,so
c|I don't have ___ money for a new phone.|enough|too,so
c|The room isn't big ___.|enough|too,so
c|It's ___ a nice day!|such|so,too
c|The film was ___ boring!|so|such,enough
c|Can you ___ me ten pounds? (одолжить мне)|lend|borrow,owe
c|I can't ___ a new car. (позволить себе)|afford|waste,spend
t|The coffee is ___ hot to drink. (too/enough)|too
t|He isn't old ___ to drive. (too/enough)|enough
t|It was ___ a cheap hotel! (so/such)|such
o|У меня недостаточно денег.|I don't have enough money.
o|Это слишком дорого для меня.|It is too expensive for me.`
});

addWeek('bogdan', {
t: 'Экология и городская жизнь', e: '🌍', g: 'Определительные придаточные: who, which, that',
tip: 'who — для людей, which — для предметов, that — для людей и предметов. where — место. The man who lives next door… The book which I bought… that можно вместо who/which.',
l: `<p><b>Относительные местоимения</b> соединяют предложения:</p>
<div class="ex">The man <b>who</b> lives next door is a doctor. (человек)<br>The book <b>which</b> I bought is interesting. (предмет)<br>This is the park <b>where</b> we play football. (место)<br>She is a person <b>that</b> everybody likes. (человек / вещь)</div>
<p><b>who / which / that</b> — подлежащее: <u>нельзя</u> опускать: The woman <b>who</b> called is my aunt.<br>Если местоимение — дополнение, можно опустить: The film (<b>that</b>) I saw was great.</p>
<p>Экология: We should <b>recycle</b> plastic and <b>protect</b> nature.</p>`,
v: `environment=окружающая среда; pollution=загрязнение; litter=мусор (на улице); recycle=перерабатывать; plastic=пластик; glass=стекло; paper=бумага; metal=металл; energy=энергия; electricity=электричество; solar=солнечный; climate=климат; global warming=глобальное потепление; protect=защищать; damage=вредить; danger=опасность; endangered=исчезающий; noise=шум; crowd=толпа; skyscraper=небоскрёб; underground=метро; public transport=общественный транспорт; population=население; village=деревня; countryside=сельская местность; peaceful=спокойный, мирный; polluted=загрязнённый; clean=чистый; waste=отходы; save=беречь; throw away=выбрасывать; reduce=сокращать; harm=вред; resources=ресурсы; fuel=топливо`,
x: `c|The man ___ lives next door is a doctor.|who|which,where
c|The book ___ I bought is interesting.|which|who,where
c|This is the park ___ we play football.|where|who,which
c|She is the girl ___ won the prize.|who|which,where
c|The bag ___ is on the table is mine.|that|who,where
c|We should ___ plastic bottles. (перерабатывать)|recycle|waste,damage
c|Cars cause ___ in big cities. (загрязнение)|pollution|litter,energy
t|The woman ___ called you is my aunt. (who/which)|who
t|That is the house ___ I was born. (where/which)|where
t|The laptop ___ I bought yesterday is very fast. (which/who)|which
o|Человек, который живёт рядом, — мой друг.|The man who lives next door is my friend.
o|Это город, где я родился.|This is the town where I was born.`
});

addWeek('bogdan', {
t: 'Культура и традиции', e: '🎎', g: 'Used to',
tip: 'used to + глагол — привычка или состояние в прошлом, которых больше нет. Отрицание: didn\'t use to. Вопрос: Did you use to…? Не путай: I am used to (я привык) + -ing.',
l: `<p><b>used to + инфинитив</b> — раньше (было, делал), а теперь нет:</p>
<div class="ex">I <b>used to</b> play the piano. (Раньше играл, теперь нет.)<br>People <b>used to</b> write letters. · There <b>used to</b> be a cinema here.</div>
<p>Отрицание: I <b>didn't use to</b> like fish. Вопрос: <b>Did</b> you <b>use to</b> live here?</p>
<p>⚠️ Различай: <b>used to</b> + глагол (раньше) и <b>be used to</b> + -ing (привык): I'm used to <b>getting up</b> early.</p>
<p>Традиции: Nowadays people <b>celebrate</b> New Year with fireworks, but in the past they <b>used to</b> celebrate it differently.</p>`,
v: `tradition=традиция; custom=обычай; celebrate=праздновать; Christmas=Рождество; New Year=Новый год; Easter=Пасха; carnival=карнавал; fireworks=салют, фейерверк; decorate=украшать; present=подарок; greeting card=открытка; greet=приветствовать; culture=культура; history=история; ancient=древний; modern=современный; traditional=традиционный; national=национальный; folk=народный; religion=религия; belief=вера, убеждение; legend=легенда; hero=герой; king=король; queen=королева; palace=дворец; war=война; peace=мир; in the past=в прошлом; nowadays=в наши дни; once=однажды, когда-то; elderly=пожилой; ancestor=предок; heritage=наследие; costume=костюм`,
x: `c|I ___ play the piano when I was a child.|used to|use to,was used to
c|People ___ write letters. Now they send messages.|used to|are used to,use to
c|She didn't ___ like fish.|use to|used to,using to
c|___ you use to live in this town?|Did|Do,Were
c|There ___ be a cinema here.|used to|use to,is used to
c|I'm used to ___ up early. (привык)|getting|get,got
c|She ___ be shy, but now she is confident.|used to|use to,is used to
t|He ___ to smoke, but he stopped. (used/use)|used
t|Did you ___ to play football? (use/used)|use
t|We ___ to be friends in the past. (used/use)|used
o|Раньше я жил в маленькой деревне.|I used to live in a small village.
o|Они раньше праздновали Рождество дома.|They used to celebrate Christmas at home.`
});

addWeek('bogdan', {
t: 'Фразовые глаголы', e: '🧩', g: 'Фразовые глаголы (Phrasal verbs)',
tip: 'Фразовый глагол = глагол + частица (up, on, off, out, in, down). Значение часто неожиданное: give up (сдаться). Разделяемые: turn the light on / turn it on (местоимение — между).',
l: `<p><b>Phrasal verbs</b> меняют значение глагола:</p>
<div class="ex">look <b>for</b> (искать) · look <b>after</b> (присматривать) · look <b>up</b> (искать в словаре)<br>turn <b>on</b> / <b>off</b> (включить / выключить) · turn <b>up</b> / <b>down</b> (громче / тише)<br>give <b>up</b> (бросить) · find <b>out</b> (выяснить) · pick <b>up</b> (поднять, забрать)</div>
<p><b>Разделяемые:</b> Turn <b>the TV</b> off = Turn <b>it</b> off. ✗ Turn off it.<br><b>Неразделяемые:</b> look <b>after</b> the baby / look after <b>him</b>.</p>
<p>Учи их в предложениях и группируй по частицам.</p>`,
v: `turn on=включать; turn off=выключать; turn up=делать громче; turn down=делать тише; put on=надевать; take off=снимать; look for=искать; look after=присматривать за; look up=искать в словаре; find out=выяснить; give up=бросать, сдаваться; give back=возвращать; pick up=поднимать, забирать; put away=убирать на место; set up=настраивать, основывать; sit down=садиться; stand up=вставать; come back=возвращаться; go on=продолжать; go out=выходить, гулять; hurry up=торопиться; calm down=успокаиваться; cheer up=приободриться; carry on=продолжать; run out of=исчерпать запас; break down=ломаться; throw away=выбрасывать; fill in=заполнять; try out=пробовать; sort out=разобраться; work out=решить, тренироваться; show up=появляться; wake up=просыпаться; get on=ладить`,
x: `c|Please ___ the TV. It's too loud. (сделай тише)|turn down|turn up,turn on
c|I'm ___ my keys. Have you seen them?|looking for|looking after,looking up
c|Don't ___! You can do it. (сдаваться)|give up|give back,give away
c|Can you ___ the form, please? (заполнить)|fill in|fill on,fill off
c|The car ___ on the motorway. (сломалась)|broke down|broke up,broke off
c|We've ___ milk. (закончилось)|run out of|run away,run in
c|Turn ___ the light, please. (включи)|on|up,off
t|Please ___ your shoes. (take off/put on — снимите)|take off
t|I'll ___ the words in the dictionary. (look up/look for — найду в словаре)|look up
t|Hurry ___! We're late. (up/on)|up
o|Включи свет, пожалуйста.|Turn on the light, please.
o|Не выбрасывай эту книгу.|Don't throw away this book.`
});

addWeek('bogdan', {
t: 'Общение и догадки', e: '🗣️', g: 'Модальные глаголы предположения: must, might, can’t',
tip: 'must be — наверняка (95%): He must be tired. might / may / could — возможно (50%): She might be at home. can\'t be — не может быть (0%): That can\'t be true! После них — глагол без to.',
l: `<p>Догадываемся, насколько мы уверены:</p>
<div class="ex"><b>must</b> be — наверняка, должно быть: He <b>must be</b> at work. His car is outside.<br><b>might / may / could</b> be — возможно: She <b>might be</b> at home.<br><b>can't</b> be — не может быть: That <b>can't be</b> true!</div>
<p>Глагол после них — <u>без to</u>: He <b>must have</b> a car. They <b>might come</b>.</p>
<p>Фразы для общения: <b>I suppose</b>… · <b>Apparently</b>… · <b>It looks like</b>… · <b>Obviously</b>…</p>
<p>Общение: <b>suggest</b> (предложить), <b>advise</b> (посоветовать), <b>warn</b> (предупредить), <b>apologise</b> (извиниться).</p>`,
v: `conversation=разговор; discuss=обсуждать; explain=объяснять; describe=описывать; suggest=предлагать (идею); advise=советовать; warn=предупреждать; apologise=извиняться; thank=благодарить; congratulate=поздравлять; introduce=представлять; gossip=сплетничать; rumour=слух; secret=секрет; truth=правда; lie=лгать; doubt=сомневаться; guess=догадываться; suppose=полагать; obviously=очевидно; apparently=по-видимому; certainly=несомненно; unlikely=маловероятно; likely=вероятно; keep in touch=поддерживать связь; get in touch=связаться; might=возможно (модальный); must be=наверняка; can't be=не может быть; interrupt=перебивать; mention=упоминать; whisper=шептать; shout=кричать; agree=соглашаться; disagree=не соглашаться; invite=приглашать`,
x: `c|He's got a Ferrari. He ___ be rich.|must|can't,might to
c|That ___ be true! It's impossible. (не может)|can't|must,might to
c|She isn't answering. She ___ be asleep. (возможно)|might|must to,can't
c|They ___ be at home. The lights are on. (наверняка)|must|can't,might to
c|I ___ you to see a doctor. (советую)|advise|suggest to,warn
c|He ___ for being late. (извинился)|apologised|thanked,mentioned
c|It's ___ that he will come. He never comes. (маловероятно)|unlikely|likely,certainly
t|It ___ be Tom. He's in London. (can't/must)|can't
t|She ___ be at the gym. I'm not sure. (might/must)|might
t|He's been working all day. He ___ be tired. (must/can't)|must
o|Он, должно быть, дома.|He must be at home.
o|Она может быть занята.|She might be busy.`
});

addWeek('bogdan', {
t: 'Большое повторение', e: '🏆', g: 'Связующие слова и все времена',
tip: 'although/but — контраст; because/so — причина/результат; however — «однако»; unless = if…not; while/during/until — время. Выбираем время по маркерам: yesterday → Past Simple, now → Present Continuous, ever/just → Present Perfect.',
l: `<p><b>Связки (linking words):</b></p>
<div class="ex"><b>although</b> + предложение: <b>Although</b> it was cold, we went out.<br><b>however</b> — «однако»: It was cold. <b>However</b>, we went out.<br><b>because</b> (причина) · <b>so</b> (результат) · <b>unless</b> = if … not<br><b>until</b> — до тех пор, пока · <b>while</b> — пока · <b>during</b> — во время (+ существительное)</div>
<p><b>Все времена:</b><br>Present Simple (always) · Present Continuous (now) · Past Simple (yesterday) · Past Continuous (at 8 o'clock yesterday) · Present Perfect (ever, just, already) · going to / will (tomorrow).</p>
<p>🏆 Это финальная неделя — докажи, что ты готов к следующему уровню!</p>`,
v: `although=хотя; however=однако; therefore=поэтому; besides=кроме того; instead=вместо; except=кроме; whether=ли; unless=если не; until=до тех пор, пока; while=пока, в то время как; during=во время; among=среди; through=через; against=против; without=без; within=в пределах; towards=к; quite=довольно; rather=скорее; almost=почти; nearly=почти; especially=особенно; recently=недавно; suddenly=внезапно; immediately=немедленно; actually=на самом деле; by the way=кстати; of course=конечно; at least=по крайней мере; in fact=фактически; on the other hand=с другой стороны; as soon as=как только; whenever=всякий раз, когда; both=оба; either=любой из двух; neither=ни тот, ни другой`,
x: `c|___ it was cold, we went out.|Although|Because,So
c|It was late. ___, we continued working.|However|Because,Unless
c|I fell asleep ___ the film.|during|while,until
c|Wait here ___ I come back.|until|during,unless
c|I'll go ___ you want to stay. (если не)|unless|if,because
c|She ___ in Paris when she met him. (была в Париже)|was living|has lived,lives
c|I ___ already finished my homework.|have|did,am
c|Look! They ___ the match.|are winning|win,will win
t|I ___ him yesterday. (to see)|saw
t|She ___ to Spain three times. (to be — Present Perfect)|has been
t|We ___ to the sea next summer. (go — going to)|are going to go
o|Хотя шёл дождь, мы пошли гулять.|Although it was raining, we went for a walk.
o|Я не знаю, придёт ли он.|I don't know whether he will come.`
});
