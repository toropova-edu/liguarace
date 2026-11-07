addWeek('bogdan', {
t: 'Продукты и магазин еды', e: '🛒', g: 'Исчисляемые / неисчисляемые, some / any / much / many',
tip: 'Исчисляемые (apple → apples): many, a few, a/an. Неисчисляемые (milk, sugar): much, a little, some. a lot of — подходит везде. much/many — в вопросах и отрицаниях.',
l: `<p><b>Исчисляемые</b> можно посчитать: an apple, two apples. <b>Неисчисляемые</b> — нет: milk, bread, sugar, water, cheese.</p>
<div class="ex">many apples · <b>a few</b> apples<br>much milk · <b>a little</b> milk<br><b>a lot of</b> apples / milk (везде)</div>
<p><b>How many</b> eggs? · <b>How much</b> sugar?<br>Вопрос/отрицание: Is there <b>any</b> milk? There aren't <b>any</b> eggs. Утверждение: There is <b>some</b> milk.</p>
<p>Порции неисчисляемых: <b>a loaf of</b> bread, <b>a bottle of</b> water, <b>a packet of</b> rice, <b>a slice of</b> cheese.</p>`,
v: `bread=хлеб; milk=молоко; cheese=сыр; meat=мясо; fish=рыба; egg=яйцо; rice=рис; potato=картофель; tomato=помидор; apple=яблоко; sugar=сахар; salt=соль; loaf=буханка; slice=ломтик; packet=пачка; tin=консервная банка; jar=стеклянная банка; bottle=бутылка; carton=упаковка (молока, сока); bunch=пучок, связка; piece=кусок; kilo=килограмм; litre=литр; flour=мука; oil=растительное масло; honey=мёд; jam=варенье; yoghurt=йогурт; cream=сливки; cereal=хлопья; beans=фасоль; cabbage=капуста; pepper=перец; peach=персик; pear=груша; cherry=вишня; lettuce=листовой салат; fresh=свежий; frozen=замороженный`,
x: `c|How ___ eggs do we need?|many|much,a little
c|How ___ sugar do you want?|much|many,a few
c|There isn't ___ milk in the fridge.|any|some,a
c|I'd like a ___ of bread.|loaf|bottle,carton
c|We have ___ tomatoes, but not many. (немного)|a few|a little,much
c|She drinks ___ water every day. (много)|a lot of|a few,many
c|Is there ___ cheese?|any|an,a few
t|There is ___ juice in the glass. (немного — a little/a few)|a little
t|I don't have ___ apples. (any/some)|any
t|Buy a ___ of milk. (bottle/slice)|carton/bottle
o|Сколько сыра ты хочешь?|How much cheese do you want?
o|В холодильнике немного йогурта.|There is a little yoghurt in the fridge.`
});

addWeek('bogdan', {
t: 'Готовим на кухне', e: '👨‍🍳', g: 'Повелительное наклонение, порядок действий',
tip: 'Рецепт = Imperative: Peel, chop, add. Запрет: Don\'t + глагол. Порядок: First, Then, Next, After that, Finally. Вежливо: Please, Could you…?',
l: `<p><b>Imperative</b> (приказ, инструкция) — глагол в начальной форме:</p>
<div class="ex"><b>Peel</b> the potatoes. <b>Chop</b> the onion. <b>Add</b> some salt. <b>Don't</b> burn the pan!</div>
<p>Слова порядка: <b>First</b>, … <b>Then</b>, … <b>Next</b>, … <b>After that</b>, … <b>Finally</b>, …</p>
<p>Предложить вместе: <b>Let's</b> cook dinner! · Вежливая просьба: <b>Could you</b> pass the salt, please?</p>`,
v: `cook=готовить; boil=варить; fry=жарить; bake=печь; cut=резать; chop=нарезать; mix=смешивать; stir=помешивать; pour=наливать; add=добавлять; peel=чистить (овощи); heat=нагревать; melt=таять, растапливать; recipe=рецепт; ingredient=ингредиент; pan=сковорода; pot=кастрюля; oven=духовка; fridge=холодильник; freezer=морозильник; grill=гриль; toaster=тостер; blender=блендер; cutlery=столовые приборы; tray=поднос; lid=крышка; spice=специя; sauce=соус; raw=сырой; tasty=вкусный; burn=сжечь, подгорать; serve=подавать на стол; then=потом; next=далее; finally=наконец`,
x: `c|___ the onions and add them to the pan.|Chop|Chopping,Chops
c|___ burn the pan! (не жги)|Don't|Not,Doesn't
c|First, ___ the water. (вскипятить)|boil|boils,boiling
c|___ the eggs with sugar. (смешай)|Mix|Mixes,Mixing
c|___ cook dinner together! (давай)|Let's|Lets,Let
c|___ you pass the salt, please?|Could|Do,Are
t|___ the potatoes, then cut them. (peel)|Peel
t|___ put too much salt! (не клади)|Don't
t|___, serve the dish with rice. (finally/first)|Finally
o|Сначала нарежьте лук.|First, chop the onion.
o|Добавьте немного соли и перемешайте.|Add some salt and mix.`
});

addWeek('bogdan', {
t: 'В ресторане', e: '🍽️', g: 'Would like, вежливые просьбы, заказ',
tip: 'I\'d like… — хочу (вежливо). Could I have…? / Can I have…? — просьба. Would you like…? — предложение. Заказ: I\'ll have the soup (решил сейчас).',
l: `<p><b>Заказываем:</b></p>
<div class="ex">Could I <b>see the menu</b>, please?<br>I'd like the chicken, please. · I'll have a salad.<br>Could we have <b>the bill</b>, please?</div>
<p><b>Официант спрашивает:</b> <b>Are you ready to order?</b> · <b>Would you like</b> something to drink? · <b>How would you like</b> your steak? — Well done / Medium / Rare.</p>
<p>Вежливость: <b>Could</b> вежливее, чем <b>Can</b>. <b>Would you like</b> some dessert?</p>
<p>Полезно: <b>I'm allergic to</b> nuts. · <b>I'm vegetarian.</b> · <b>Is service included?</b></p>`,
v: `menu=меню; order=заказывать; bill=счёт; tip=чаевые; waiter=официант; waitress=официантка; booking=бронь; starter=закуска; main course=основное блюдо; dessert=десерт; drink=напиток; beer=пиво; wine=вино; still water=вода без газа; sparkling water=газированная вода; well done=хорошо прожаренный; medium=средней прожарки; rare=с кровью; vegetarian=вегетарианец; allergic=аллергичный; portion=порция; take away=еда на вынос; service=обслуживание; complain=жаловаться; recommend=рекомендовать; taste=вкус, пробовать; full=сытый; sour=кислый; bitter=горький; spicy=острый; delicious=вкусный (очень); salty=солёный; sweet=сладкий; dish=блюдо`,
x: `c|I ___ like the chicken, please.|would|will,am
c|___ I see the menu, please?|Could|Do,Am
c|___ you like some dessert?|Would|Do,Are
c|How would you like your steak? — ___, please. (хорошо прожаренный)|Well done|Rare,Medium
c|I'm ___ to nuts. (аллергия)|allergic|allergy,allergies
c|Could we have the ___, please? (счёт)|bill|tip,order
c|Is ___ included? (обслуживание)|service|portion,starter
t|I ___ have the soup. (решаю сейчас — will)|will/'ll
t|___ you like something to drink? (Would/Do)|Would
t|Could I have a glass of ___ water? (без газа — still/sparkling)|still
o|Я бы хотел столик на двоих.|I would like a table for two.
o|Можно мне счёт, пожалуйста?|Could I have the bill, please?`
});

addWeek('bogdan', {
t: 'Дом и квартира', e: '🏡', g: 'There is / There are, предлоги места',
tip: 'There is + 1 / неисчисляемое, There are + много. Вопрос: Is there / Are there? Предлоги: in, on, under, above, below, opposite, between, behind, in front of, next to.',
l: `<p><b>There is / There are</b> (есть, находится):</p>
<div class="ex">There <b>is</b> a lift in the building.<br>There <b>are</b> two bedrooms in the flat.<br><b>Is there</b> a balcony? — Yes, there is. · <b>Are there</b> any shops near here? — No, there aren't.</div>
<p>Предлоги: <b>on</b> the floor, <b>above</b> the sofa (над), <b>below</b> (под, ниже), <b>opposite</b> (напротив), <b>between</b> two chairs, <b>behind</b> the door.</p>
<p>Описание жилья: <b>It's on the second floor.</b> · <b>It has got</b> a big living room.</p>`,
v: `apartment=квартира; floor=этаж; ground floor=первый этаж; lift=лифт; neighbour=сосед; landlord=арендодатель; rent=арендовать, аренда; furniture=мебель; sofa=диван; wardrobe=шкаф для одежды; shelf=полка; curtains=шторы; carpet=ковёр; pillow=подушка; blanket=одеяло; sheet=простыня; mirror=зеркало; cupboard=шкафчик; drawer=ящик; heating=отопление; air conditioner=кондиционер; vacuum cleaner=пылесос; iron=утюг; broom=веник; bucket=ведро; rubbish=мусор; bin=мусорное ведро; garage=гараж; yard=двор; fence=забор; roof=крыша; basement=подвал; attic=чердак; comfortable=удобный; cosy=уютный`,
x: `c|There ___ a lift in the building.|is|are,have
c|There ___ two bedrooms in the flat.|are|is,have
c|___ there a balcony?|Is|Are,Does
c|___ there any shops near here?|Are|Is,Do
c|The lamp is ___ the sofa. (над)|above|between,behind
c|The bank is ___ the park. (напротив)|opposite|between,behind
c|There ___ any sugar. (нет)|isn't|aren't,don't
t|There ___ three windows in my room. (is/are)|are
t|The cat is sleeping ___ the sofa. (под)|under
t|My flat is ___ the third floor. (on/in)|on
o|Моя квартира на четвёртом этаже.|My flat is on the fourth floor.
o|В гостиной есть уютный диван.|There is a cosy sofa in the living room.`
});

addWeek('bogdan', {
t: 'Режим дня и привычки', e: '⏰', g: 'Present Simple vs Present Continuous',
tip: 'Привычки, факты, расписание → Present Simple (always, usually, every day). То, что происходит сейчас, временно → Present Continuous (now, at the moment, today). Глаголы состояния (know, like, want) в Continuous не используем.',
l: `<p><b>Present Simple</b> — привычки и факты: I <b>get up</b> at 7. She <b>works</b> in a bank.<br><b>Present Continuous</b> — сейчас / временно: I <b>am working</b> now. He <b>is staying</b> with us this week.</p>
<div class="ex">Every day I <b>drink</b> tea. → Today I <b>am drinking</b> coffee.</div>
<p><b>Наречия частоты</b> (always, usually, often, sometimes, never) — с Present Simple. Позиция: перед глаголом, после to be.</p>
<p><b>Глаголы состояния</b> (know, like, love, want, need, understand) обычно <u>не</u> используются в Continuous: I <b>want</b> a coffee (не I am wanting).</p>`,
v: `alarm clock=будильник; get up=вставать; have a shower=принимать душ; get dressed=одеваться; commute=ездить на работу; arrive=прибывать; leave=уходить, уезжать; lunch break=обеденный перерыв; schedule=расписание; chores=домашние дела; do the washing-up=мыть посуду; do the laundry=стирать бельё; make the bed=заправлять кровать; take out the rubbish=выносить мусор; go shopping=ходить за покупками; relax=отдыхать; usually=обычно; habit=привычка; routine=распорядок дня; early=рано; late=поздно; regular=регулярный; rest=отдых; nap=короткий сон; exhausted=измотанный; busy=занятый; sometimes=иногда; never=никогда; always=всегда; every day=каждый день; at the moment=в данный момент`,
x: `c|I usually ___ up at 7.|get|am getting,gets
c|Look! The children ___ in the garden.|are playing|play,plays
c|She ___ work at 8 every day.|starts|is starting,start
c|He ___ a shower at the moment.|is having|has,have
c|I ___ the answer. (знаю)|know|am knowing,knows
c|They ___ the laundry now.|are doing|do,does
c|My dad ___ takes out the rubbish. (всегда)|always|is always,does always
t|We ___ lunch at one o'clock every day. (to have)|have
t|Be quiet! The baby ___. (to sleep)|is sleeping
t|She ___ TV in the evenings. (not / watch)|doesn't watch/does not watch
o|Обычно я езжу на работу на автобусе.|I usually commute to work by bus.
o|Сейчас я убираюсь на кухне.|I am cleaning the kitchen now.`
});

addWeek('bogdan', {
t: 'Семья и отношения', e: '👪', g: 'Притяжательные формы и Whose',
tip: 'Имя + \'s = чей: Tom\'s sister. Мн. число на -s: parents\' house. Whose …? — Чей? Ответ: It\'s mine / yours / his / hers / ours / theirs (без существительного).',
l: `<p><b>Притяжательный падеж</b>: Tom<b>'s</b> sister, my parents<b>'</b> house, the children<b>'s</b> room.</p>
<p><b>Whose</b> bag is this? — It's <b>Anna's</b>. / It's <b>hers</b>.</p>
<div class="ex">my → <b>mine</b> · your → <b>yours</b> · his → <b>his</b> · her → <b>hers</b> · our → <b>ours</b> · their → <b>theirs</b></div>
<p>my book = <b>mine</b> (без существительного): This book is <b>mine</b>.</p>
<p>Отношения: <b>get on with</b> (ладить), <b>argue with</b> (спорить), <b>look after</b> (присматривать).</p>`,
v: `relatives=родственники; mother-in-law=свекровь, тёща; father-in-law=свёкор, тесть; stepfather=отчим; stepmother=мачеха; twin=близнец; nephew=племянник; niece=племянница; grandson=внук; granddaughter=внучка; grandparents=бабушка и дедушка; boyfriend=парень; girlfriend=девушка; partner=партнёр; married=женатый, замужем; single=неженатый, одинокий; divorced=разведённый; engaged=помолвленный; get married=пожениться; wedding=свадьба; date=свидание; trust=доверять; argue=спорить; miss=скучать; grow up=взрослеть; bring up=воспитывать; look after=присматривать; get on with=ладить с; generation=поколение; relationship=отношения; kind=добрый; strict=строгий; spoil=баловать; parents=родители; only child=единственный ребёнок`,
x: `c|This is ___ car. (машина Тома)|Tom's|Toms,Toms'
c|Whose bag is this? — It's ___. (её)|hers|her,she's
c|These books aren't yours. They are ___. (наши)|ours|our,us
c|The ___ room is big. (комната детей)|children's|childrens',childrens
c|That isn't my phone. ___ is on the table. (мой)|Mine|My,Me
c|I get ___ well with my sister. (ладить)|on|in,at
c|She ___ after her little brother. (присматривает)|looks|watches,sees
t|This is my grandparents' house. = This house is ___. (their)|theirs
t|___ coat is this? (чьё)|Whose
t|My parents ___ married for 30 years. (is/are)|are
o|Это дом моих родителей.|This is my parents' house.
o|Чья это сумка? — Она моя.|Whose bag is this? It is mine.`
});

addWeek('bogdan', {
t: 'Одежда и покупки', e: '👕', g: 'Сравнительная и превосходная степень',
tip: 'Коротк.: -er / the -est (cheap → cheaper → the cheapest). Длинные: more / the most + прилаг. good → better → the best, bad → worse → the worst. as … as — такой же, как.',
l: `<p><b>Сравнительная</b> (более…): cheap → cheap<b>er</b> <u>than</u>; expensive → <b>more</b> expensive <u>than</u>.<br><b>Превосходная</b> (самый…): the cheap<b>est</b>; <b>the most</b> expensive.</p>
<div class="ex">big → bi<b>gg</b>er → the bi<b>gg</b>est · pretty → pret<b>tier</b> → the pret<b>tiest</b><br>good → <b>better</b> → <b>the best</b> · bad → <b>worse</b> → <b>the worst</b></div>
<p><b>as … as</b> — такой же: This shirt is <b>as</b> cheap <b>as</b> that one. <b>not as … as</b> — не такой… как: It's <b>not as</b> big <b>as</b> mine.</p>
<p>В магазине: <b>It doesn't fit.</b> · Do you have <b>a bigger size</b>? · It's <b>too</b> tight.</p>`,
v: `clothes=одежда; underwear=бельё; pyjamas=пижама; suit=костюм; tie=галстук; belt=ремень; trainers=кроссовки; sandals=сандалии; slippers=тапочки; purse=кошелёк (женский); handbag=сумочка; backpack=рюкзак; umbrella=зонт; jewellery=украшения; ring=кольцо; necklace=ожерелье; watch=наручные часы; sunglasses=солнцезащитные очки; fashion=мода; style=стиль; fit=подходить по размеру; match=сочетаться; try on=примерять; size=размер; tight=тесный; loose=свободный; colourful=разноцветный; plain=однотонный; striped=полосатый; checked=клетчатый; cotton=хлопок; wool=шерсть; leather=кожа; second-hand=секонд-хэнд; bargain=выгодная покупка; refund=возврат денег`,
x: `c|This jacket is ___ than that one. (дешевле)|cheaper|more cheap,cheapest
c|It's the ___ dress in the shop. (самое дорогое)|most expensive|more expensive,expensivest
c|This bag is ___ than mine. (лучше)|better|gooder,more good
c|That was the ___ film. (худший)|worst|baddest,most bad
c|My shoes are ___ comfortable as yours. (такие же)|as|than,more
c|Your coat is ___ than my coat. (теплее)|warmer|more warm,warmest
c|The trousers are ___ big. They don't fit. (слишком)|too|very,enough
t|Winter clothes are ___ than summer clothes. (expensive)|more expensive
t|This is the ___ T-shirt in the shop. (cheap)|cheapest
t|She is not ___ tall as her brother. (as/so)|as
o|Эти кроссовки удобнее, чем те.|These trainers are more comfortable than those.
o|Это самая красивая шапка в магазине.|This is the most beautiful hat in the shop.`
});

addWeek('bogdan', {
t: 'Здоровье', e: '🏥', g: 'Should / shouldn’t, have to / must',
tip: 'should / shouldn\'t — совет («стоит / не стоит»). must — внутренняя необходимость; have to — внешняя обязанность. don\'t have to = не обязательно, mustn\'t = нельзя.',
l: `<p><b>should / shouldn't</b> — совет:</p>
<div class="ex">You <b>should</b> see a doctor. · You <b>shouldn't</b> eat so much sugar.</div>
<p><b>have to</b> — «приходится, обязан» (правило, обстоятельства): I <b>have to</b> take this medicine. He <b>has to</b> stay in bed.<br>Отрицание: <b>don't have to</b> = не обязательно (можно, но не нужно).<br><b>mustn't</b> = нельзя! You <b>mustn't</b> smoke here.</p>
<p>Жалобы: I've got a <b>sore throat</b>. · My back <b>hurts</b>. · What's the matter? — I feel <b>sick</b>.</p>`,
v: `ill=больной; sick=больной, тошнит; ache=боль (ноющая); toothache=зубная боль; stomachache=боль в животе; sore throat=больное горло; cough=кашель; fever=высокая температура; flu=грипп; allergy=аллергия; injury=травма; wound=рана; broken=сломанный; hurt=болеть, причинять боль; feel better=чувствовать себя лучше; recover=выздоравливать; treatment=лечение; prescription=рецепт (врача); tablet=таблетка; pill=пилюля; plaster=пластырь; bandage=бинт; appointment=приём (запись); nurse=медсестра; patient=пациент; ambulance=скорая помощь; emergency=неотложная ситуация; diet=диета; exercise=упражнение; pharmacy=аптека; sneeze=чихать; blood=кровь; temperature=температура; headache=головная боль; rest in bed=лежать в постели`,
x: `c|You ___ see a doctor. (стоит)|should|must to,should to
c|You ___ eat so much sugar. (не стоит)|shouldn't|don't should,mustn't to
c|I ___ take this medicine three times a day. (обязан по назначению)|have to|must to,should
c|You ___ smoke here! (нельзя)|mustn't|don't have to,shouldn't to
c|You don't ___ come today. (не обязательно)|have to|must,should
c|She ___ stay in bed. (приходится)|has to|have to,must to
c|What's the ___ with you? (что с тобой)|matter|matters,mattered
t|You ___ drink more water. (should/shouldn't)|should
t|He ___ to go to hospital. (have/has)|has
t|We ___ have to hurry. There is a lot of time. (do/don't)|don't
o|Тебе стоит больше отдыхать.|You should rest more.
o|Мне нужно пойти к врачу.|I have to see a doctor.`
});

addWeek('bogdan', {
t: 'Город и направления', e: '🧭', g: 'Предлоги движения, как пройти',
tip: 'Движение: go along (вдоль), go past (мимо), go across (через), go through (сквозь), turn left/right, take the first/second turning. Вопрос: Excuse me, how do I get to…? / Where is…?',
l: `<p><b>Спрашиваем дорогу:</b> Excuse me, how do I get to the station? · Is there a bank near here? · Could you tell me the way to…?</p>
<div class="ex">Go <b>straight on</b> for two blocks.<br>Go <b>along</b> this street and <b>past</b> the bank.<br><b>Cross</b> the bridge. Go <b>through</b> the park.<br><b>Turn left</b> at the traffic lights. <b>Take the second turning</b> on the right.</div>
<p>Где находится: It's <b>opposite</b> the museum, <b>next to</b> the café, <b>between</b> the library and the bank, <b>at the end of</b> the street, <b>on the corner</b>.</p>`,
v: `cross=пересекать; roundabout=кольцевая развязка; traffic lights=светофор; pavement=тротуар; zebra crossing=пешеходный переход; junction=перекрёсток; opposite=напротив; behind=позади; in front of=перед; between=между; next to=рядом с; go past=проходить мимо; go along=идти вдоль; go through=идти сквозь; turning=поворот; straight on=прямо; corner=угол; end of the street=конец улицы; lost=потерянный; distance=расстояние; sign=знак, указатель; address=адрес; square=площадь; monument=памятник; castle=замок; town hall=ратуша; theatre=театр; stadium=стадион; gym=спортзал; swimming pool=бассейн; petrol station=заправка; car park=парковка; district=район; suburb=пригород; centre=центр; bridge=мост`,
x: `c|Go ___ this street and then turn left. (вдоль)|along|past,between
c|___ the bridge and you'll see the museum. (перейди)|Cross|Crossing,Crosses
c|Go ___ the bank. (мимо)|past|across,between
c|Turn left ___ the traffic lights.|at|on,to
c|The cinema is ___ the library and the café. (между)|between|opposite,behind
c|Excuse me, how do I ___ to the station?|get|go,come
c|Take the second turning on the ___. (справа)|right|rights,righter
t|Go ___ the park. (through/past — сквозь)|through
t|The theatre is ___ the end of the street. (at/in)|at
t|Excuse me, is there a bank ___ here? (near/far)|near
o|Идите прямо, затем поверните налево.|Go straight on, then turn left.
o|Как пройти к вокзалу?|How do I get to the station?`
});

addWeek('bogdan', {
t: 'Путешествия и транспорт', e: '✈️', g: 'Past Simple: правильные глаголы',
tip: 'Правильные глаголы + ed (visited), e → +d (arrived), y → ied (studied), краткая гласная + согласная удваиваем (stopped). Отрицание: didn\'t + глагол. Вопрос: Did you…? Произношение -ed: [t], [d], [id].',
l: `<p><b>Past Simple</b> — завершённое действие в прошлом (yesterday, last week, in 2020, two days ago).</p>
<div class="ex">visit → visit<b>ed</b> · arrive → arrive<b>d</b> · study → stud<b>ied</b> · stop → sto<b>pp</b>ed · travel → travel<b>l</b>ed (брит.)</div>
<p>Отрицание: I <b>didn't</b> visit Rome. Вопрос: <b>Did</b> you travel by train? — Yes, I <b>did</b>. / No, I <b>didn't</b>.</p>
<p>Произношение -ed: после глухих [t] (worked), после звонких [d] (played), после t/d — [ɪd] (wanted).</p>
<p>Рассказ: <b>First</b>, we arrived… <b>Then</b> we walked… <b>After that</b>… <b>Finally</b>…</p>`,
v: `journey=путешествие; trip=поездка; flight=рейс; departure=вылет; arrival=прилёт; gate=выход на посадку; boarding pass=посадочный талон; customs=таможня; passport control=паспортный контроль; delay=задержка; cancel=отменять; single ticket=билет в один конец; return ticket=билет туда и обратно; platform=платформа; timetable=расписание поездов; seat=место; window seat=место у окна; driving licence=водительские права; petrol=бензин; tyre=шина; engine=двигатель; speed=скорость; ferry=паром; harbour=порт; motorway=автомагистраль; traffic jam=пробка; rush hour=час пик; get on=садиться; get off=выходить; passenger=пассажир; luggage=багаж; book a ticket=заказать билет; take off=взлетать; land=приземляться; miss the train=опоздать на поезд`,
x: `c|We ___ in Rome yesterday morning.|arrived|arrive,arriving
c|They ___ the museum last Sunday.|visited|visit,visits
c|I ___ by train. (не путешествовал)|didn't travel|didn't travelled,don't travel
c|___ you enjoy the flight?|Did|Do,Were
c|The plane ___ at 9 o'clock. (взлетел)|took off|taked off,take off
c|He ___ playing football when he was a child. (любил)|loved|love,loves
c|We ___ the bus at the station. (вышли)|got off|get off,gets off
t|We ___ a taxi to the airport. (to call/ to order — call)|called
t|She ___ in Paris for two weeks. (to stay)|stayed
t|They ___ the plane. (not / miss)|didn't miss/did not miss
o|Мы приехали в аэропорт рано.|We arrived at the airport early.
o|Вчера я не ездил на работу на метро.|I didn't go to work by metro yesterday.`
});
