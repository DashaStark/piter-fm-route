import { useEffect, useRef, useState } from 'react'

const heroImage = `${import.meta.env.BASE_URL}start_picture.jpg`
const archImage =
  'https://images.unsplash.com/photo-1642024265069-2006a575a519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200'
const canalImage =
  'https://images.unsplash.com/photo-1529839731635-e4909433cc5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200'
const publicAsset = (file: string) => `${import.meta.env.BASE_URL}${file}`

type Point = {
  name: string
  fact: string
  task: string
  hint: string
  duration: string
  image: string
  imageAlt: string
  frame: string
}

const points: Point[] = [
  {
    name: 'Площадь Льва Толстого',
    fact: 'Знаменитый «Дом с башнями» Розенштейна на углу Большого и Каменноостровского построен в образе средневекового замка, где вертикальные эркеры унаследованы от стоявшего здесь ранее женского училища, на одной из башен спрятан циферблат со знаками зодиака, а окна 3-го и 5-го этажей специально сдвинуты архитектором для создания едва заметной «живой» асимметрии фасада.',
    task: 'Пропусти один зелёный. Снимите короткий ролик замирания толпы на красный свет и ее мгновенного хаотичного движения на зеленый.',
    hint: 'В разработке',
    duration: '01:24',
    image: publicAsset('preview/1.png'),
    imageAlt: 'Дом с башнями на площади Льва Толстого',
    frame: 'Секунда до',
  },
  {
    name: 'Силин мост',
    fact: 'Монументальный железобетонный мост 1936 года с тяжелыми гранитными парапетами перекинут через Карповку, а прямо у моста располагается Первый жилой дом Ленсовета — легендарный памятник ленинградского конструктивизма с плавно изогнутым фасадом.',
    task: 'Расположитесь на Силином мосту так, чтобы в объектив попали массивный парапет и изогнутый фасад Дома Ленсовета, зафиксируйте фокус на статичной архитектуре и снимите движение прохожих или машин с помощью проводки или длинной выдержки, превратив спешащих людей в размытые тени и создав художественный эффект киношного расфокуса.',
    hint: 'В разработке',
    duration: '02:08',
    image: publicAsset('preview/2.png'),
    imageAlt: 'Арка и отражение в Петербурге',
    frame: 'В разработке',
  },
  {
    name: 'Метро «Чкаловская»',
    fact: 'Наземный вестибюль станции (1997 г.) спроектирован в форме элементов фюзеляжа самолёта в честь перелёта Валерия Чкалова, а внутри сохранена строгая индустриальная эстетика: светильники на эскалаторах стилизованы под пропеллеры, а разметка пола отсылает к взлётной полосе.',
    task: 'Встаньте у наземного вестибюля со стороны ступеней и бюста Чкалова, выждите момент и выхватите взглядом из серо-чёрного потока прохожих один яркий цветовой акцент, в идеале красный: куртку, шарф, зонт или сумку. Постройте кадр так, чтобы этот объект остался главным фокусным центром, а остальные фигуры растворились в нейтральном фоне.',
    hint: 'Не гонись за красным пятном. Найди место, где оно появится само, и подожди.',
    duration: '01:37',
    image: publicAsset('preview/3.png'),
    imageAlt: 'Мост над петербургским каналом',
    frame: 'Красная шапочка',
  },
  {
    name: 'Дом Бенуа',
    fact: 'Сказочный и грандиозный комплекс с башнями-эркерами, лабиринтами и внутренними дворами облицован редким шведским камнем и напоминает огромный каменный черновик, созданный тремя архитекторами семьи Бенуа.',
    task: 'Перейдите на противоположную сторону Каменноостровского проспекта, найдите ракурс, где арка двора или ветви деревьев образуют естественную рамку для башен, и снимите плавный панорамный видеопроезд без резких движений, медленно ведя камеру вдоль ограды или отходя назад.',
    hint: 'В разработке',
    duration: '01:52',
    image: publicAsset('preview/4.png'),
    imageAlt: 'Человек проходит под аркой',
    frame: 'В разработке',
  },
  {
    name: 'Доходный дом Лидваль',
    fact: 'Памятник северного модерна Фёдора Лидваля образует парадный двор-курдонер за кованой решёткой, а его фасад превращается в живой лес с барельефами сов, зайцев, рыси, мухоморов и огромного паука в паутине.',
    task: 'Сначала отойдите за кованую ограду со стороны Малой Посадской и сделайте общий кадр парадного двора в образе застывшего сказочного замка, а затем подойдите вплотную к зданию, отыщите скрытую декоративную деталь и снимите её крупным планом, отсекая всё лишнее вокруг.',
    hint: 'Дом хитрый, зверей на нём не сразу видно. Если не нашёл, отойди на несколько шагов и посмотри еще раз.',
    duration: '02:16',
    image: publicAsset('preview/5.png'),
    imageAlt: 'Городская панорама у воды',
    frame: 'Каменный лес',
  },
  {
    name: 'Метро «Горьковская»',
    fact: 'Район пропитан кинематографической эстетикой благодаря соседству со старейшей киностудией «Ленфильм», чьи неоклассические фасады с колоннами скрывают лабиринт съёмочных павильонов и дворов напротив Александровского парка.',
    task: 'Отыщите у вестибюля метро или в парке выразительную деталь на переднем плане: афишную тумбу, ствол дерева, край стены или собственную ладонь. Замрите и снимите короткое видео, где проходящие вдали люди пересекают кадр, а передний план образует размытую фактурную раму.',
    hint: 'В разработке',
    duration: '01:45',
    image: publicAsset('preview/6.png'),
    imageAlt: 'Архитектура у канала',
    frame: 'В разработке',
  },
  {
    name: 'Биржевой мост',
    fact: 'Стальной пятипролётный мост 1960 года с розовым гранитом и трезубцами Нептуна на решётках проектировался как младший брат Дворцового моста для симметрии Стрелки, а его разводной механизм при открытии сначала сдвигает крылья в стороны на 15 сантиметров.',
    task: 'Встаньте на пешеходной части Биржевого моста у центрального пролёта, прижмите смартфон к гранитному парапету для неподвижности и запишите 10-секундное вертикальное видео, направив объектив на течение Малой Невы и оставив городской шум за спиной.',
    hint: 'В разработке',
    duration: '01:31',
    image: publicAsset('preview/7.png'),
    imageAlt: 'Петербургская набережная',
    frame: 'В разработке',
  },
  {
    name: 'Нижний лебяжий мост',
    fact: 'Каменный мост 1837 года инженера П. П. Базена при перестройке в 1920-х годах сохранил оригинальную чугунную решётку 1835 года с круглыми розетками, веерными пальметтами и столбиками с шарами над узкой Лебяжьей канавкой.',
    task: 'Выйдите на середину гранитного моста у впадения канавки в Мойку, уберите телефон на пару минут для созерцания и сделайте один кадр без дублей вдоль воды. Затем включите сетку смартфона и скомпонуйте статичный кадр, где берега канавки сходятся в одну точку перспективы.',
    hint: 'В разработке',
    duration: '02:03',
    image: publicAsset('preview/8.png'),
    imageAlt: 'Каменная архитектура арки',
    frame: 'В разработке',
  },
  {
    name: '2-й Инженерный мост',
    fact: 'Мост 1826 года с золочёными торшерами из пучков копий полтора века стоит над сушей из-за засыпанного канала, а в доходном доме напротив, доме Безобразовых, фасад XIX века скрывает встроенные стены здания XVIII века.',
    task: 'Найдите ракурс, в котором в одном кадре соединятся золочёный торшер, гранит моста и старый фасад напротив. Зафиксируйте телефон и снимите короткое наблюдение за прохожими, чтобы новая жизнь города прошла поверх слоёв его истории.',
    hint: 'В разработке',
    duration: '01:58',
    image: publicAsset('preview/9.png'),
    imageAlt: 'Старый мост над водой',
    frame: 'В разработке',
  },
  {
    name: 'Мост Белинского',
    fact: 'Это единственный мост через Фонтанку, сохранивший исходные очертания пролётов XVIII века, когда у него были гранитные башни. Он выводит к угловому дому Фокина, где в дореволюционные годы шили гвардейские офицерские фуражки по индивидуальной мерке.',
    task: 'Отодвиньтесь подальше по набережной, зафиксируйте телефон, включите оптический зум от 3x и выстройте композицию из трёх слоёв: фонаря на переднем плане, моста с движением в центре и дома Фокина сзади. Запишите 10-секундное стационарное видео с эффектом сжатия перспективы.',
    hint: 'В разработке',
    duration: '01:49',
    image: publicAsset('preview/10.png'),
    imageAlt: 'Архитектура Петербурга с необычного ракурса',
    frame: 'В разработке',
  },
  {
    name: 'Доходный дом Иофа',
    fact: 'Доходный дом купца-антиквара Иофа на углу Литейного и Белинского — это дореволюционный «самострой»: архитектор Александр Лишневский построил его шестиэтажным вопреки разрешению только на пять этажей (что позже узаконила новая владелица, княгиня Голицына), а на первом этаже дом всю историю объединял людей — от предвоенного ультрамодного буфета-автомата и советской пирожковой до современного кафе.',
    task: 'Выбери витрину или окно кафе и сними кадр, в котором наслаиваются две картинки: то, что за стеклом, и отражение города за твоей спиной. Либо ты можешь зайти в кафе за чашкой кофе и снять зеркальный вид прямо оттуда.',
    hint: 'Встань под углом относительно стекла — так отражение будет сильнее. Самостоятельно выбери и настрой фокус: что ты хочешь поставить на первое место — отражение или то, что скрывается за стеклом.',
    duration: '01:36',
    image: publicAsset('preview/11.png'),
    imageAlt: 'Спокойная вода петербургского канала',
    frame: 'Зазеркалье',
  },
  {
    name: 'Пять углов',
    fact: 'Доходный дом Иофа у Пяти углов (построенный тем же архитектором Александром Лишневским перед Первой мировой войной) увенчан знаковой башней с пятью окнами по числу сходящихся дорог, а на его эркерах спрятан жезл Гермеса (кадуцей) — античный символ путников и дорог, охраняющий этот знаменитый петербургский перекрёсток.',
    task: 'Встань на углу тротуара, ближе к дороге и сними каждую из пяти улиц коротким роликом по 3–5 секунд. Постарайся передать свои ощущения и настроение улиц, которые ты чувствуешь. Выбери одну дорогу, по которой пойдешь дальше и сними на ней финальный кадр, какой захочешь. Правил и подсказок больше нет.',
    hint: 'Правил и подсказок больше нет.',
    duration: '02:27',
    image: publicAsset('preview/12.png'),
    imageAlt: 'Панорама города в кинематографическом свете',
    frame: 'Направо пойдешь…',
  },
]

const mapDots = [
  [17, 76],
  [24, 63],
  [41, 67],
  [48, 48],
  [63, 55],
  [73, 38],
  [57, 29],
  [43, 34],
  [31, 22],
  [18, 30],
  [12, 45],
  [24, 52],
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  )
}

function SoundIcon({ playing }: { playing: boolean }) {
  return (
    <span className={`sound-bars ${playing ? 'is-playing' : ''}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  )
}

function RouteMap({ unlocked }: { unlocked: number }) {
  const path = mapDots.map(([x, y]) => `${x},${y}`).join(' ')
  const routeProgress = ((unlocked - 1) / (mapDots.length - 1)) * 100
  const currentIndex = Math.max(0, Math.min(unlocked - 1, points.length - 1))
  const currentPoint = points[currentIndex]

  return (
    <div className="route-map" aria-label={`Карта маршрута. Открыто точек: ${unlocked} из 12`}>
      <div className="map-water map-water-a" />
     
      <div className="map-plate-header">
        <span>ПИТЕР FM <i>·</i>  КАРТА</span>
        <strong>ROLL 01 <i>·</i> 12 СЦЕН</strong>
      </div>
      <div className="map-frame-scale" aria-label={`Открыто ${unlocked} из 12 сцен`}>
        {mapDots.map((_, index) => (
          <span className={index < unlocked ? 'is-reached' : ''} key={index}>
            <i />{String(index + 1).padStart(2, '0')}
          </span>
        ))}
      </div>
      <svg viewBox="0 0 90 90" role="img" aria-hidden="true">
        <g className="map-streets">
          <path d="M6 13 31 18 52 12 82 19M8 24 27 29 48 23 78 31M4 39 24 34 43 41 70 35 86 40M6 52 28 47 45 54 68 49 86 57M12 67 32 62 51 68 78 61M10 78 29 73 48 79 72 73" />
          <path d="M16 7 21 27 16 44 24 62 20 84M38 9 34 25 40 43 36 63 43 81M59 7 55 24 62 43 57 59 65 82M77 10 72 27 80 45 75 65 82 80" />
        </g>
        <path className="map-river" d="M5 46 C18 39 23 49 34 45 S51 38 60 44 72 52 86 45" />
        <polyline className="map-path-bg" points={path} />
        <polyline
          className="map-path-active"
          points={path}
          pathLength="100"
          style={{ strokeDasharray: `${routeProgress} 100` }}
        />
        {mapDots.map(([x, y], index) => (
          <g
            key={index}
            className={`${index < unlocked ? 'reached' : ''} ${index === Math.max(0, unlocked - 1) ? 'current' : ''} map-point`}
          >
            <circle className="map-point-halo" cx={x} cy={y} r="4.3" />
            <circle cx={x} cy={y} r="2.8" />
            <text x={x} y={y + 0.9} textAnchor="middle">
              {index + 1}
            </text>
          </g>
        ))}
        <g className="map-compass" transform="translate(78 12)">
          <path d="M0 6V0M-2 2 0 0 2 2" />
          <text x="0" y="-2" textAnchor="middle">N</text>
        </g>
      </svg>
      <div className="map-label label-neva">НЕВА</div>
      <div className="map-coordinates">59°56′ N<br />30°19′ E</div>
      
      <div className="map-caption">
        <span><i /> МАРШРУТ</span>
        <strong>12,6 км · ≈ 2,5 часа</strong>
      </div>
    </div>
  )
}

function formatAudioTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00'
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}

function AudioTrack({ file, fallbackDuration, onEnded }: { file: string; fallbackDuration: string; onEnded?: () => void }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) await audio.play()
    else audio.pause()
  }

  const seek = (value: number) => {
    const audio = audioRef.current
    if (!audio || !Number.isFinite(value)) return
    audio.currentTime = value
    setCurrentTime(value)
  }

  const skip = (seconds: number) => {
    const audio = audioRef.current
    if (!audio) return
    seek(Math.max(0, Math.min(audio.duration || 0, audio.currentTime + seconds)))
  }

  return (
    <div className="audio-block">
      <span className="eyebrow">Радио</span>
      <div className="audio-controls">
        <button
          className="play-button"
          type="button"
          onClick={togglePlayback}
          aria-label={playing ? 'Поставить аудио на паузу' : 'Включить аудио'}
        >
          {playing ? 'Ⅱ' : '▶'}
        </button>
        <div className="audio-timeline">
          <div className="audio-time-row">
            <span>{formatAudioTime(currentTime)}</span>
            <span>{duration ? formatAudioTime(duration) : fallbackDuration}</span>
          </div>
          <input
            className="audio-range"
            type="range"
            min="0"
            max={duration || 1}
            step="0.01"
            value={Math.min(currentTime, duration || 1)}
            onChange={(event) => seek(Number(event.target.value))}
            aria-label="Перемотать аудио"
          />
        </div>
        <div className="audio-skip-buttons" aria-label="Быстрая перемотка">
          <button type="button" onClick={() => skip(-5)} aria-label="Назад на 5 секунд">-5 сек</button>
          <button type="button" onClick={() => skip(10)} aria-label="Вперёд на 10 секунд">+10 сек</button>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={publicAsset(file)}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false)
          setCurrentTime(0)
          onEnded?.()
        }}
      />
    </div>
  )
}

const pointPhotos: Record<number, { file: string; alt: string }[]> = {
  0: [
    { file: 'point 1/1.jpg', alt: 'Площадь Льва Толстого, дополнительный кадр 1' },
    { file: 'point 1/2.jpg', alt: 'Площадь Льва Толстого, дополнительный кадр 2' },
    { file: 'point 1/3.jpg', alt: 'Площадь Льва Толстого, дополнительный кадр 3' },
  ],
  7: [
    { file: 'point 8/1 (1).png', alt: 'Нижний Лебяжий мост, кадр 1' },
    { file: 'point 8/1 (1).jpg', alt: 'Нижний Лебяжий мост, кадр 2' },
    { file: 'point 8/1 (2).jpg', alt: 'Нижний Лебяжий мост, кадр 3' },
    { file: 'point 8/1 (3).jpg', alt: 'Нижний Лебяжий мост, кадр 4' },
  ],
  8: [
    { file: 'point 9/1 (1).png', alt: '2-й Инженерный мост, кадр 1' },
    { file: 'point 9/1 (1).jpg', alt: '2-й Инженерный мост, кадр 2' },
    { file: 'point 9/1 (2).jpg', alt: '2-й Инженерный мост, кадр 3' },
    { file: 'point 9/1 (3).jpg', alt: '2-й Инженерный мост, кадр 4' },
  ],
  9: [
    { file: 'point 10/1 (1).png', alt: 'Мост Белинского, кадр 1' },
    { file: 'point 10/1 (2).png', alt: 'Мост Белинского, кадр 2' },
  ],
  10: [
    { file: 'point 11/1 (1).png', alt: 'Доходный дом Иофа, кадр 1' },
    { file: 'point 11/1 (1).jpg', alt: 'Доходный дом Иофа, кадр 2' },
    { file: 'point 11/1 (2).jpg', alt: 'Доходный дом Иофа, кадр 3' },
  ],
  11: [
    { file: 'point 12/1.jpg', alt: 'Пять углов, кадр 1' },
    { file: 'point 12/1.jpeg', alt: 'Пять углов, кадр 2' },
  ],
}

function PointGallery({ index }: { index: number }) {
  const photos = pointPhotos[index]
  if (!photos?.length) return null

  return (
    <div className="point-gallery" aria-label={`Фотографии сцены ${index + 1}`}>
      {photos.map((photo, photoIndex) => (
        <figure className={photoIndex === 0 ? 'point-gallery-main' : ''} key={photo.file}>
          <img src={publicAsset(photo.file)} alt={photo.alt} />
          <figcaption>Кадр {String(photoIndex + 1).padStart(2, '0')}</figcaption>
        </figure>
      ))}
    </div>
  )
}

function PointContent({
  point,
  index,
  complete,
  expanded,
  bridgeStage,
  pointNineTask,
  pointElevenStage,
  onExpand,
  onComplete,
  onBridgeComplete,
  onPointNineAudioEnd,
  onPointElevenComplete,
}: {
  point: Point
  index: number
  complete: boolean
  expanded: boolean
  bridgeStage: number
  pointNineTask: 'Задание 1' | 'Задание 2' | null
  pointElevenStage: number
  onExpand?: () => void
  onComplete: () => void
  onBridgeComplete: () => void
  onPointNineAudioEnd: () => void
  onPointElevenComplete: () => void
}) {
  return (
    <div className="point-content">
      {!expanded && (
        <button className="expand-card" type="button" onClick={onExpand}>
          Открыть сцену на весь экран <span>↗</span>
        </button>
      )}
      <div className="point-heading">
        <div>
          <span className="eyebrow">Сцена {String(index + 1).padStart(2, '0')} / 12</span>
          <h2>{point.name}</h2>
        </div>
        <span className="timecode">00:{String(index * 7 + 4).padStart(2, '0')}:18</span>
      </div>

      <PointGallery index={index} />

      <div className="point-grid">
        <AudioTrack
          file={index === 8 ? 'audio/9_1.mp3' : index === 10 ? 'audio/11_1.mp3' : `audio/${index + 1}.mp3`}
          fallbackDuration={point.duration}
          onEnded={index === 8 ? onPointNineAudioEnd : undefined}
        />

        <div className="fact-block">
          <span className="eyebrow">Архитектура</span>
          <p>{point.fact}</p>
        </div>
      </div>

      {(index !== 8 || pointNineTask) && <div className="task-block">
        <span className="task-number">{String(index + 1).padStart(2, '0')}</span>
        <div>
          <span className="eyebrow">Задание оператору</span>
          <h3>
            {index === 8
              ? pointNineTask === 'Задание 1'
                ? 'Орёл: снимите противоположный берег сквозь чугунную решётку, используя её узор как живописную раму.'
                : 'Решка: подойдите вплотную к элементам моста и наведите резкий фокус на золочёный наконечник копий или венок, уводя противоположный берег в глубокий блюр.'
              : point.task}
          </h3>
        </div>
        {!complete ? (
          <button type="button" onClick={onComplete}>
            Кадр снят
            <ArrowIcon />
          </button>
        ) : (
          <span className="complete-mark">Кадр снят</span>
        )}
      </div>}

      {index !== 0 && (
        <aside className="hint-block">
          <span className="eyebrow">Подсказка</span>
          <p>{point.hint}</p>
        </aside>
      )}

      {index === 8 && bridgeStage > 0 && (
        <div className="bridge-episode">
          <div className="bridge-copy">
            <span className="eyebrow">Задание 09.2 · другой берег</span>
            <h3>Пока гуляете, присмотритесь к окнам на противоположном берегу реки.</h3>
            <p>Снимите одно или несколько окон с зумом: удастся ли вам увидеть в них жизнь?</p>
            <p className="bridge-hint"><strong>Подсказка:</strong> не стоит снимать окна, если в них можно рассмотреть людей.</p>
            {bridgeStage === 1 ? (
              <>
                <AudioTrack file="audio/9_2.mp3" fallbackDuration={point.duration} />
                <button type="button" onClick={onBridgeComplete}>Второй кадр снят <ArrowIcon /></button>
              </>
            ) : (
              <span className="bridge-complete">Оба кадра сняты</span>
            )}
          </div>
          <figure>
            <img src={heroImage} alt="Дом на противоположном берегу за мостом" />
            <figcaption>Снять отсюда · не переходя мост</figcaption>
          </figure>
        </div>
      )}

      {index === 10 && pointElevenStage > 0 && (
        <div className="bridge-episode point-eleven-episode">
          <div className="bridge-copy">
            <span className="eyebrow">Запись 11.2 · продолжение</span>
            <h3>Эфир продолжается</h3>
            <p>Послушайте вторую запись и затем продолжите маршрут.</p>
            <AudioTrack file="audio/11_2.mp3" fallbackDuration={point.duration} />
            <button type="button" onClick={onPointElevenComplete}>Вернуться в карусель <ArrowIcon /></button>
          </div>
        </div>
      )}
    </div>
  )
}

function PointPreview({
  point,
  index,
  complete,
  bridgeStage,
  onExpand,
}: {
  point: Point
  index: number
  complete: boolean
  bridgeStage: number
  onExpand: () => void
}) {
  const pointNineStatus =
    index === 8 && bridgeStage === 1
      ? 'Открыто второе задание'
      : index === 8 && bridgeStage === 2
        ? 'Оба кадра сняты'
        : null

  return (
    <div className="point-preview" data-frame={String(index + 1).padStart(2, '0')}>
      <figure>
        <img src={publicAsset(`preview/${index + 1}.png`)} alt={point.imageAlt} />
        <div className="preview-shade" />
        <figcaption>
          <span>{point.frame}</span>
          <h2>{point.name}</h2>
        </figcaption>
        <span className="preview-rec">REC</span>
        <span className="preview-timecode">00:{String(index * 7 + 4).padStart(2, '0')}:18</span>
      </figure>
    </div>
  )
}

function RouteProgress({
  active,
  unlocked,
  onSelect,
}: {
  active: number
  unlocked: number
  onSelect: (index: number) => void
}) {
  const progressDots = points.map((_, index) => [index % 2 === 0 ? 38 : 62, 4 + index * (92 / 11)])
  const path = progressDots.map(([x, y]) => `${x},${y}`).join(' ')
  const progress = (unlocked / (points.length - 1)) * 100

  return (
    <div className="carousel-progress">
      <div className="progress-copy">
        <span>Маршрут</span>
        <strong>{String(Math.min(unlocked + 1, 12)).padStart(2, '0')} / 12</strong>
      </div>
      <div className="route-line">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points={path} pathLength="100" className="progress-path-base" />
          <polyline
            points={path}
            pathLength="100"
            className="progress-path-fill"
            style={{ strokeDasharray: `${progress} 100` }}
          />
        </svg>
        {progressDots.map(([x, y], index) => {
          const enabled = index <= unlocked
          return (
            <button
              key={index}
              type="button"
              disabled={!enabled}
              className={`${enabled ? 'reached' : ''} ${active === index ? 'active' : ''}`}
              style={{ left: `${x}%`, top: `${y}%` }}
              onClick={() => onSelect(index)}
              aria-label={`Перейти к сцене «${points[index].name}»`}
            >
              {index + 1}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function MapModal({ nextPoint, onClose }: { nextPoint: number; onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="map-title">
      <div className="map-modal">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Закрыть карту">×</button>
        <div className="mini-map">
          <RouteMap unlocked={nextPoint} />
        </div>
        <div className="map-modal-copy">
          <span className="eyebrow">Случайность выбрала</span>
          <h2 id="map-title">{points[nextPoint - 1].name}</h2>
          <p>Монетка указала путь дальше. Откройте карту, чтобы добраться до следующей точки, или продолжайте без навигации.</p>
          <a
            href="https://yandex.ru/maps/?rtext=~&rtt=pd"
            target="_blank"
            rel="noreferrer"
          >
            Открыть пеший маршрут <ArrowIcon />
          </a>
          <button type="button" onClick={onClose}>Продолжить без карты</button>
        </div>
      </div>
    </div>
  )
}

function CoinModal({ onResult }: { onResult: (side: 'Орёл' | 'Решка') => void }) {
  const [tossing, setTossing] = useState(false)
  const [side, setSide] = useState<'Орёл' | 'Решка' | null>(null)

  const tossCoin = () => {
    if (tossing || side) return
    setTossing(true)
    window.setTimeout(() => {
      setSide(Math.random() < 0.5 ? 'Орёл' : 'Решка')
      setTossing(false)
    }, 1100)
  }

  return (
    <div className="modal-backdrop coin-backdrop" role="dialog" aria-modal="true" aria-labelledby="coin-title">
      <div className="map-modal coin-modal">
        <div className="coin-copy map-modal-copy">
          <span className="eyebrow">Сцена 09 · случайность</span>
          <h2 id="coin-title">Кадр пойман.<br />Какое задание выбрать?</h2>
          <p>Нажмите на монетку. Случай выберет следующий кадр.</p>
          <button
            className={`coin ${tossing ? 'is-tossing' : ''} ${side ? 'has-result' : ''}`}
            type="button"
            onClick={() => side ? onResult(side) : tossCoin()}
            disabled={tossing}
            aria-label={side ? 'Закрыть окно и открыть задание' : 'Бросить монетку'}
          >
            <span className="coin-rim" aria-hidden="true" />
            <span className="coin-face">
              {side ? <img src={publicAsset(side === 'Орёл' ? 'coin/heads.png' : 'coin/tails.png')} alt={side} /> : <span className="coin-placeholder">?</span>}
            </span>
          </button>
          {side && <p className="coin-result">Выпала сторона: {side.toLowerCase()}</p>}
        </div>
      </div>
    </div>
  )
}

function CreditsModal({ name, onClose }: { name: string; onClose: () => void }) {
  const hero = name.trim() || 'Вы'

  return (
    <div className="credits-modal" role="dialog" aria-modal="true" aria-labelledby="credits-title">
      <div className="credits-grain" />
      <div className="credits-vignette" aria-hidden="true" />
      <button type="button" className="credits-skip" onClick={onClose}>
        Пропустить титры
      </button>
      <div className="credits-scroller">
        <div className="credits-roll">
          <h2 id="credits-title" className="credits-logo">
            ПИТЕР<span className="credits-logo-fm">FM</span>
          </h2>
          <section className="credits-block credits-crew">
            <dl>
              <div>
                <dt>В главных ролях:</dt>
                <dd>Санкт-Петербург</dd>
              </div>
              <div>
                <dt>Режиссёр:</dt>
                <dd>{hero}</dd>
              </div>
              <div>
                <dt>Оператор:</dt>
                <dd>{hero}</dd>
              </div>
              <div>
                <dt>Место действия:</dt>
                <dd>12 локаций, 5 мостов, 2 перекрёстка</dd>
              </div>
              <div>
                <dt>В эпизодах:</dt>
                <dd>Случайные прохожие, птицы над Фонтанкой, шум ветра и радиоволна</dd>
              </div>
            </dl>
          </section>

          <p className="credits-quote">«Всё будет хорошо, я проверила»</p>
          <p className="credits-motto">
            Случайности не случайны. Выбирай любую из пяти дорог, включай любимую музыку в наушниках — и пусть этот
            день сложится сам собой.
          </p>

          <p className="credits-thanks">Благодарим за прогулку</p>
          <p className="credits-finale">КОНЕЦ</p>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [started, setStarted] = useState(false)
  const [userName, setUserName] = useState('')
  const [unlocked, setUnlocked] = useState(0)
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState<number | null>(null)
  const [mapOffer, setMapOffer] = useState<number | null>(null)
  const [coinOffer, setCoinOffer] = useState(false)
  const [pointNineTask, setPointNineTask] = useState<'Задание 1' | 'Задание 2' | null>(null)
  const [bridgeStage, setBridgeStage] = useState(0)
  const [pointElevenStage, setPointElevenStage] = useState(0)
  const [creditsOpen, setCreditsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerHidden, setHeaderHidden] = useState(false)
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth)
  const [viewportHeight, setViewportHeight] = useState(() => window.innerHeight)
  const routeRef = useRef<HTMLElement>(null)
  const carouselViewportRef = useRef<HTMLDivElement>(null)
  const wheelLocked = useRef(false)

  useEffect(() => {
    const modalOpen = expanded !== null || mapOffer !== null || coinOffer || creditsOpen
    document.body.style.overflow = modalOpen ? 'hidden' : ''
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExpanded(null)
        setMapOffer(null)
        setCoinOffer(false)
        setCreditsOpen(false)
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [expanded, mapOffer, coinOffer, creditsOpen])

  useEffect(() => {
    const updateWidth = () => {
      setViewportWidth(window.innerWidth)
      setViewportHeight(window.innerHeight)
    }
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  useEffect(() => {
    if (!started) return
    const updateHeader = () => {
      const carousel = document.querySelector('.carousel-route')
      if (!carousel) return
      const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 76
      setHeaderHidden(carousel.getBoundingClientRect().top <= headerHeight)
    }
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    window.addEventListener('resize', updateHeader)
    return () => {
      window.removeEventListener('scroll', updateHeader)
      window.removeEventListener('resize', updateHeader)
    }
  }, [started])

  const startRoute = () => {
    if (!userName.trim()) return
    setStarted(true)
    window.setTimeout(() => {
      document.querySelector('.carousel-route')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  const completePoint = (index: number) => {
    if (index === 8 && bridgeStage === 0) {
      setBridgeStage(1)
      return
    }
    if (index === 10 && pointElevenStage === 0) {
      setPointElevenStage(1)
      return
    }
    const next = Math.min(index + 1, points.length)
    setUnlocked(next)
    setExpanded(null)
    if (next === points.length) setActive(points.length)
  }

  const openPointNineCoin = () => {
    if (!pointNineTask) setCoinOffer(true)
  }

  const completeBridgeEpisode = () => {
    setBridgeStage(2)
    setUnlocked(9)
    setExpanded(null)
  }

  const completePointEleven = () => {
    setPointElevenStage(2)
    setUnlocked(11)
    setExpanded(null)
  }

  const selectCard = (index: number) => {
    if (index <= unlocked) setActive(index)
  }

  const cardStep =
    (viewportWidth <= 800 ? viewportHeight * 0.65 : Math.min(690, viewportHeight * 0.72)) + 2

  useEffect(() => {
    const viewport = carouselViewportRef.current
    if (!viewport || !started) return

    const handleWheel = (event: WheelEvent) => {
      if (expanded !== null || Math.abs(event.deltaY) < 6) return

      event.preventDefault()

      const direction = event.deltaY > 0 ? 1 : -1
      const maxIndex = Math.min(unlocked, points.length)
      const atFirst = active === 0 && direction < 0
      const atLast = active >= maxIndex && direction > 0

      if (atFirst || atLast) return

      if (wheelLocked.current) return

      setActive((current) => Math.max(0, Math.min(maxIndex, current + direction)))
      wheelLocked.current = true
      window.setTimeout(() => {
        wheelLocked.current = false
      }, 720)
    }

    viewport.addEventListener('wheel', handleWheel, { passive: false })
    return () => viewport.removeEventListener('wheel', handleWheel)
  }, [started, expanded, active, unlocked, viewportWidth, viewportHeight])

  return (
    <main>
      <header className={`site-header ${headerHidden ? 'is-hidden' : ''}`}>
        <a className="brand" href="#top" aria-label="Питер в кадре — в начало">
          <SoundIcon playing={started} />
          <span>Питер<br />в кадре</span>
        </a>
        <div className="header-meta">Иммерсивная прогулка · 12+</div>
        <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? 'Закрыть' : 'О прогулке'}
        </button>
      </header>

      {menuOpen && (
        <aside className="about-panel">
          <span className="eyebrow">До выхода</span>
          <h2>Возьмите наушники и зарядите телефон.</h2>
          <p>Прогулка проходит в своём темпе. Вам понадобятся камера, около двух часов и готовность смотреть внимательнее.</p>
          <button type="button" onClick={() => setMenuOpen(false)}>Понятно</button>
        </aside>
      )}

      <section className="hero" aria-label="Питер в кадре — иммерсивная прогулка">
        <img className="hero-bg" src={heroImage} alt="Петербургская набережная в мягком вечернем свете" />
        <div className="film-grain" aria-hidden="true" />
        <div className="hero-content">
          <span className="eyebrow light">Иммерсивная прогулка · Санкт-Петербург</span>
          <h1>Не смотри на город.<br /><em>Смотри вместе с ним.</em></h1>
          <div className="hero-bottom">
            <div className="hero-radio-intro">
              <div className="radio-signal">
                <svg className="radio-wave" viewBox="0 0 168 56" aria-hidden="true" preserveAspectRatio="none">
                  <path className="radio-wave-line radio-wave-line-back" d="M0 28 C14 28 14 17 28 17 S42 39 56 39 70 20 84 20 98 36 112 36 126 22 140 22 154 28 168 28" />
                  <path className="radio-wave-line radio-wave-line-front" d="M0 28 C10 28 10 8 20 8 S30 48 40 48 50 12 60 12 70 41 80 41 90 16 100 16 110 38 120 38 130 21 140 21 150 28 168 28" />
                  <path className="radio-wave-line radio-wave-line-back" d="M0 28 C14 28 14 34 28 34 S42 19 56 19 70 31 84 31 98 24 112 24 126 33 140 33 154 28 168 28" />
                </svg>
              </div>
              <div className="hero-radio-copy">
                <p className="hero-greeting">Слушатели <em>«Питер ФМ»</em>, здравствуйте!</p>
                <p className="hero-description">
                  Почувствуйте себя оператором фильма на архитектурной прогулке по знаковым местам культового фильма 2000-х.
                </p>
                <p className="hero-signoff">Это возможность услышать город и себя.</p>
              </div>
            </div>
            <button
              className="start-button"
              type="button"
              onClick={() => document.querySelector('.prologue')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Настроиться на волну <ArrowIcon />
            </button>
          </div>
        </div>
        <span className="hero-index">ПЕТЕРБУРГ · 59°56′ N / 30°19′ E</span>
        <span className="scroll-note"><span /> Листайте, чтобы начать</span>
        <span className="photo-credit">01 / 12 · ПЕРВЫЙ КАДР</span>
      </section>

      <section className="prologue" id="top">
        <div className="prologue-number">00</div>
        <div className="prologue-copy">
          <span className="eyebrow">Пролог</span>
          <h2>Мотор.<br />Камера.<br />Петербург.</h2>
          <p>
            Прямо сейчас в этом городе кто-то теряет телефон, кто-то опаздывает на встречу, а кто-то просто смотрит на дождь за стеклом. Город транслирует миллион историй, но режиссёром сегодняшнего дня будешь именно ты.
          </p>
        </div>
        <figure className="prologue-photo">
        <img src={publicAsset('prolog_picture.jpg')} alt="Описание фотографии"/>
        </figure>
        <div className="quote">
          <span>Из фильма «Питер FM»</span>
          <blockquote>«Жизнь вообще штука непредсказуемая, это только в кино все по сценарию»</blockquote>
        </div>
      </section>

      <section className="route-intro" ref={routeRef}>
        <div className="route-title glass-panel glass-panel-dark">
          <h2>Настройка<br /><em>эфира.</em></h2>
          <div className="route-instructions">
            <p>Город не показывает всё сразу. Каждая новая точка откроется только тогда, когда ты окажешься на месте.</p>
            <p>
              Надевайте наушники и отправляйтесь к{' '}
              <a
                href="https://yandex.ru/maps/?text=%D0%9F%D0%BB%D0%BE%D1%89%D0%B0%D0%B4%D1%8C%20%D0%9B%D1%8C%D0%B2%D0%B0%20%D0%A2%D0%BE%D0%BB%D1%81%D1%82%D0%BE%D0%B3%D0%BE%2C%20%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3"
                target="_blank"
                rel="noreferrer"
              >
                площади Льва Толстого <span aria-hidden="true">↗</span>
              </a>
            </p>
            <p className="route-first-frame">Первый кадр ждёт вас там.</p>
          </div>
          {!started && (
            <div className="route-onboard">
              <label className="name-entry name-entry-dark">
                <span>Как вас зовут?</span>
                <input
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                  onKeyDown={(event) => event.key === 'Enter' && startRoute()}
                  placeholder="Введите имя"
                  autoComplete="name"
                />
              </label>
              <button type="button" className="start-button start-button-compact" onClick={startRoute} disabled={!userName.trim()}>
                Начать прогулку
                <ArrowIcon />
              </button>
            </div>
          )}
        </div>
        <RouteMap unlocked={Math.min(12, Math.max(1, unlocked + 1))} />
      </section>

      {started && (
      <section className="route-flow carousel-route">
          <div className="carousel-scroll-container">
            <div className="carousel-toolbar">
              <div>
                <span className="eyebrow">Маршрут в кадрах</span>
                <p>Крутите колесо, чтобы листать сцены</p>
              </div>
              <div className="route-links">
                <a
                  className="map-link"
                  href="https://yandex.ru/maps/?rtext=~&rtt=pd"
                  target="_blank"
                  rel="noreferrer"
                >
                  Карта маршрута <span>↗</span>
                </a>
                <a
                  className="playlist-link"
                  href="https://music.yandex.ru/search?text=%D0%9F%D0%B8%D1%82%D0%B5%D1%80%20FM%20%D1%81%D0%B0%D1%83%D0%BD%D0%B4%D1%82%D1%80%D0%B5%D0%BA"
                  target="_blank"
                  rel="noreferrer"
                >
                  <SoundIcon playing />
                  Плейлист прогулки
                  <span>↗</span>
                </a>
              </div>
            </div>

            <div className="carousel-stage">
              <RouteProgress active={active} unlocked={Math.min(unlocked, points.length - 1)} onSelect={selectCard} />

              <div className="carousel-viewport" ref={carouselViewportRef} tabIndex={0}>
                <div className="film-grain film-grain-strong" aria-hidden="true" />
                <div className="film-scratches" aria-hidden="true" />
                <div className="film-gate-overlay" aria-hidden="true" />
                <div className="film-halation" aria-hidden="true" />
                <div
                  className="carousel-track film-strip-track"
                  style={{
                    transform: `translate3d(0, ${18 - active * cardStep}px, 0)`,
                  }}
                >
                  {points.map((point, index) => {
                    const available = index <= unlocked
                    const isActive = index === active
                    return (
                      <article
                        key={index}
                        className={`carousel-card visual-${index % 4} ${isActive ? 'active' : ''} ${available ? '' : 'locked'}`}
                        onClick={() => available && setExpanded(index)}
                        aria-label={available ? points[index].name : `${points[index].name} пока закрыта`}
                      >
                        {available ? (
                          <PointPreview
                            point={point}
                            index={index}
                            complete={
                              index < unlocked ||
                              (index === 8 && bridgeStage > 0) ||
                              (index === 10 && pointElevenStage > 0)
                            }
                            bridgeStage={bridgeStage}
                            onExpand={() => setExpanded(index)}
                          />
                        ) : (
                          <div className="locked-card-content">
                            <span>{String(index + 1).padStart(2, '0')}</span>
                            <p>Эта сцена ещё не проявлена</p>
                          </div>
                        )}
                      </article>
                    )
                  })}
                  <article
                    className={`carousel-card credits-preview-card ${active === points.length ? 'active' : ''} ${
                      unlocked === points.length ? '' : 'locked'
                    }`}
                    onClick={() => unlocked === points.length && setCreditsOpen(true)}
                    aria-label={unlocked === points.length ? 'Открыть финальные титры' : 'Финальные титры пока закрыты'}
                  >
                    {unlocked === points.length ? (
                      <div className="credits-preview">
                        <img className="credits-preview-image" src={publicAsset('prolog_picture.jpg')} alt="Петербург в финальном кадре" />
                        <p>Финальный кадр</p>
                        <h2 className="credits-preview-logo">
                          ПИТЕР<span>FM</span>
                        </h2>
                        <strong>Смотреть титры ↗</strong>
                      </div>
                    ) : (
                      <div className="locked-card-content">
                        <span>13</span>
                        <p>Титры появятся после финального кадра</p>
                      </div>
                    )}
                  </article>
                </div>
              </div>
            </div>

            <div className="carousel-controls">
              <button type="button" disabled={active === 0} onClick={() => setActive((value) => value - 1)}>← Назад</button>
              <span>{active === points.length ? 'Титры' : `${String(active + 1).padStart(2, '0')} / 12`}</span>
              <button
                type="button"
                disabled={active >= unlocked || active === points.length}
                onClick={() => setActive((value) => value + 1)}
              >
                Дальше →
              </button>
            </div>
          </div>
      </section>
      )}

      {expanded !== null && (
        <div className={`expanded-scene visual-${expanded % 4}`} role="dialog" aria-modal="true">
          <button className="expanded-close" type="button" onClick={() => setExpanded(null)}>
            Свернуть к карусели <span>×</span>
          </button>
          <div className="expanded-inner">
            <PointContent
              point={points[expanded]}
              index={expanded}
              complete={
                expanded < unlocked ||
                (expanded === 8 && bridgeStage > 0) ||
                (expanded === 10 && pointElevenStage > 0)
              }
              expanded
              bridgeStage={bridgeStage}
              pointNineTask={pointNineTask}
              pointElevenStage={pointElevenStage}
              onComplete={() => completePoint(expanded)}
              onBridgeComplete={completeBridgeEpisode}
              onPointNineAudioEnd={openPointNineCoin}
              onPointElevenComplete={completePointEleven}
            />
          </div>
        </div>
      )}

      {mapOffer !== null && (
        <MapModal
          nextPoint={mapOffer}
          onClose={() => {
            setActive(mapOffer - 1)
            setMapOffer(null)
          }}
        />
      )}

      {coinOffer && (
        <CoinModal
          onResult={(side) => {
            setCoinOffer(false)
            setPointNineTask(side === 'Орёл' ? 'Задание 1' : 'Задание 2')
          }}
        />
      )}

      {creditsOpen && <CreditsModal name={userName.trim()} onClose={() => setCreditsOpen(false)} />}
    </main>
  )
}
