import { useEffect, useRef, useState } from 'react'

const heroImage =
  'https://images.unsplash.com/photo-1635194490859-221bf0173708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1800'
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
    image: publicAsset('point_1.jpg'),
    imageAlt: 'Дом с башнями на площади Льва Толстого',
    frame: 'Секунда до',
  },
  {
    name: 'Силин мост',
    fact: 'В разработке',
    task: 'В разработке',
    hint: 'В разработке',
    duration: '02:08',
    image: publicAsset('point_2.jpg'),
    imageAlt: 'Арка и отражение в Петербурге',
    frame: 'В разработке',
  },
  {
    name: 'Метро «Чкаловская»',
    fact: 'Станция «Чкаловская» спроектирована как посвящение авиации: её наземный вестибюль с лестницей напоминает трап, светильники внутри стилизованы под пропеллеры, а напольная разметка зала имитирует взлётно-посадочную полосу, задавая ощущение разгона ещё до посадки в вагон.',
    task: 'Найди в толпе один яркий цветовой акцент. Лучше всего красный: куртка, шарф, зонт, сумка. Если красного нет, выбери любой самый яркий цвет. Сделай кадр так, чтобы акцент остался главным, а остальные люди стали фоном.',
    hint: 'Не гонись за красным пятном. Найди место, где оно появится само, и подожди.',
    duration: '01:37',
    image: publicAsset('point_3.jpg'),
    imageAlt: 'Мост над петербургским каналом',
    frame: 'Красная шапочка',
  },
  {
    name: 'Дом Бенуа',
    fact: 'В разработке',
    task: 'В разработке',
    hint: 'В разработке',
    duration: '01:52',
    image: publicAsset('point_4.jpg'),
    imageAlt: 'Человек проходит под аркой',
    frame: 'В разработке',
  },
  {
    name: 'Доходный дом Лидваль',
    fact: 'Доходный дом Лидваля на Малой Посадской строился в четыре этапа по проекту архитектора Фёдора Лидваля (получившего за него городской приз в 1907 году) как ансамбль разновысотных корпусов из фактурного грубого камня и гладкой плитки, где на стенах среди стилизованных ветвей и растений спрятаны барельефы животных и птиц — совы, зайца, рыси, мухомора и паука в паутине.',
    task: 'Представь, что ты снимаешь документальный портрет, а героем стал дом. Найди на фасаде деталь, которая выдает его характер. Сними её крупным планом.',
    hint: 'Дом хитрый, зверей на нём не сразу видно. Если не нашёл, отойди на несколько шагов и посмотри еще раз.',
    duration: '02:16',
    image: publicAsset('point_5.jpg'),
    imageAlt: 'Городская панорама у воды',
    frame: 'Каменный лес',
  },
  {
    name: 'Метро «Горьковская»',
    fact: 'В разработке',
    task: 'В разработке',
    hint: 'В разработке',
    duration: '01:45',
    image: publicAsset('point_6.jpg'),
    imageAlt: 'Архитектура у канала',
    frame: 'В разработке',
  },
  {
    name: 'Биржевой мост',
    fact: 'В разработке',
    task: 'В разработке',
    hint: 'В разработке',
    duration: '01:31',
    image: publicAsset('point_7.jpg'),
    imageAlt: 'Петербургская набережная',
    frame: 'В разработке',
  },
  {
    name: 'Нижний лебяжий мост',
    fact: 'В разработке',
    task: 'В разработке',
    hint: 'В разработке',
    duration: '02:03',
    image: publicAsset('point_8.png'),
    imageAlt: 'Каменная архитектура арки',
    frame: 'В разработке',
  },
  {
    name: '2-й Инженерный мост',
    fact: 'В разработке',
    task: 'В разработке',
    hint: 'В разработке',
    duration: '01:58',
    image: publicAsset('point_9.jpg'),
    imageAlt: 'Старый мост над водой',
    frame: 'В разработке',
  },
  {
    name: 'Мост Белинского',
    fact: 'В разработке',
    task: 'В разработке',
    hint: 'В разработке',
    duration: '01:49',
    image: publicAsset('point_10.jpg'),
    imageAlt: 'Архитектура Петербурга с необычного ракурса',
    frame: 'В разработке',
  },
  {
    name: 'Доходный дом Иофа',
    fact: 'Доходный дом купца-антиквара Иофа на углу Литейного и Белинского — это дореволюционный «самострой»: архитектор Александр Лишневский построил его шестиэтажным вопреки разрешению только на пять этажей (что позже узаконила новая владелица, княгиня Голицына), а на первом этаже дом всю историю объединял людей — от предвоенного ультрамодного буфета-автомата и советской пирожковой до современного кафе.',
    task: 'Выбери витрину или окно кафе и сними кадр, в котором наслаиваются две картинки: то, что за стеклом, и отражение города за твоей спиной. Либо ты можешь зайти в кафе за чашкой кофе и снять зеркальный вид прямо оттуда.',
    hint: 'Встань под углом относительно стекла — так отражение будет сильнее. Самостоятельно выбери и настрой фокус: что ты хочешь поставить на первое место — отражение или то, что скрывается за стеклом.',
    duration: '01:36',
    image: publicAsset('point_11.jpg'),
    imageAlt: 'Спокойная вода петербургского канала',
    frame: 'Зазеркалье',
  },
  {
    name: 'Пять углов',
    fact: 'Доходный дом Иофа у Пяти углов (построенный тем же архитектором Александром Лишневским перед Первой мировой войной) увенчан знаковой башней с пятью окнами по числу сходящихся дорог, а на его эркерах спрятан жезл Гермеса (кадуцей) — античный символ путников и дорог, охраняющий этот знаменитый петербургский перекрёсток.',
    task: 'Встань на углу тротуара, ближе к дороге и сними каждую из пяти улиц коротким роликом по 3–5 секунд. Постарайся передать свои ощущения и настроение улиц, которые ты чувствуешь. Выбери одну дорогу, по которой пойдешь дальше и сними на ней финальный кадр, какой захочешь. Правил и подсказок больше нет.',
    hint: 'Правил и подсказок больше нет.',
    duration: '02:27',
    image: publicAsset('point_12.png'),
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

function PointContent({
  point,
  index,
  complete,
  expanded,
  bridgeStage,
  onExpand,
  onComplete,
  onBridgeComplete,
}: {
  point: Point
  index: number
  complete: boolean
  expanded: boolean
  bridgeStage: number
  onExpand?: () => void
  onComplete: () => void
  onBridgeComplete: () => void
}) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => {
      setProgress((value) => {
        if (value >= 99) {
          setPlaying(false)
          return 100
        }
        return value + 1
      })
    }, 500)
    return () => window.clearInterval(timer)
  }, [playing])

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

      <figure className="point-image">
        <img src={point.image} alt={point.imageAlt} />
        <figcaption>{point.frame}</figcaption>
        <span>REC</span>
      </figure>

      <div className="point-grid">
        <div className="audio-block">
          <span className="eyebrow">Радио</span>
          <button
            className="audio-player"
            type="button"
            onClick={() => setPlaying(!playing)}
            aria-label={playing ? 'Поставить аудио на паузу' : 'Включить аудио'}
          >
            <span className="play-button">{playing ? 'Ⅱ' : '▶'}</span>
            <span className="audio-track">
              <span className="waveform">
                {Array.from({ length: 22 }).map((_, bar) => (
                  <i key={bar} style={{ height: `${20 + ((bar * 17) % 70)}%` }} />
                ))}
              </span>
              <span className="progress" style={{ width: `${progress}%` }} />
            </span>
            <span>{point.duration}</span>
          </button>
        </div>

        <div className="fact-block">
          <span className="eyebrow">Архитектура</span>
          <p>{point.fact}</p>
        </div>
      </div>

      <div className="task-block">
        <span className="task-number">{String(index + 1).padStart(2, '0')}</span>
        <div>
          <span className="eyebrow">Задание оператору</span>
          <h3>{point.task}</h3>
        </div>
        {!complete ? (
          <button type="button" onClick={onComplete}>
            Кадр снят
            <ArrowIcon />
          </button>
        ) : (
          <span className="complete-mark">Кадр снят</span>
        )}
      </div>

      <aside className="hint-block">
        <span className="eyebrow">Подсказка</span>
        <p>{point.hint}</p>
      </aside>

      {index === 8 && bridgeStage > 0 && (
        <div className="bridge-episode">
          <div className="bridge-copy">
            <span className="eyebrow">Задание 09.2 · другой берег</span>
            <h3>Теперь посмотрите на дом напротив</h3>
            <p>
              Он находится за мостом, но переходить туда не нужно. Приблизьте фасад камерой и представьте, как
              выглядел бы обратный кадр этой сцены.
            </p>
            {bridgeStage === 1 ? (
              <button type="button" onClick={onBridgeComplete}>Второй кадр снят <ArrowIcon /></button>
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
        <img src={point.image} alt={point.imageAlt} />
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

function CoinModal({ onContinue }: { onContinue: () => void }) {
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
          <span className="eyebrow">Сцена 01 · случайность</span>
          <h2 id="coin-title">Кадр пойман.<br />Куда пойдем дальше?</h2>
          <p>Орёл или решка.<br />Как часто и бывает в этом городе, пусть случай решит, как сложится наш сегодняшний маршрут.</p>
          <div className={`coin ${tossing ? 'is-tossing' : ''} ${side ? 'has-result' : ''}`} aria-live="polite">
            <span className="coin-rim" aria-hidden="true" />
            <span className="coin-face">{tossing ? '✦' : side ? (side === 'Орёл' ? 'ОРЁЛ' : 'РЕШКА') : '✦'}</span>
          </div>
          {side ? (
            <>
            <p className="coin-result">Выпал {side.toLowerCase()}. Нас ждет прогулка до Силина моста.</p>
              <button className="coin-action" type="button" onClick={onContinue}>
                К следующей точке <ArrowIcon />
              </button>
            </>
          ) : (
            <button className="coin-action" type="button" onClick={tossCoin} disabled={tossing}>
              {tossing ? 'Монетка в воздухе…' : 'Бросить монетку'}
            </button>
          )}
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
  const [bridgeStage, setBridgeStage] = useState(0)
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
    const next = Math.min(index + 1, points.length)
    setUnlocked(next)
    setExpanded(null)
    if (index === 0) setCoinOffer(true)
    if (next === points.length) setActive(points.length)
  }

  const completeBridgeEpisode = () => {
    setBridgeStage(2)
    setUnlocked(9)
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
                            complete={index < unlocked || (index === 8 && bridgeStage > 0)}
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
              complete={expanded < unlocked || (expanded === 8 && bridgeStage > 0)}
              expanded
              bridgeStage={bridgeStage}
              onComplete={() => completePoint(expanded)}
              onBridgeComplete={completeBridgeEpisode}
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
          onContinue={() => {
            setCoinOffer(false)
            setUnlocked(1)
            setMapOffer(2)
          }}
        />
      )}

      {creditsOpen && <CreditsModal name={userName.trim()} onClose={() => setCreditsOpen(false)} />}
    </main>
  )
}
