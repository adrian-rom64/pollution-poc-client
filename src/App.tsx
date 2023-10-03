import React from 'react'
import { StreamrClient } from 'streamr-client'
import $ from 'jquery'
import { config } from './config'
import { useEffectOnce } from './useEffectOnce'

const generatePlotItems = (e: any[]) => {
  const t = (e: any) => {
    return ['AQI', 'CO', 'NO2', 'OZONE', 'PM10', 'PM25', 'SO2']
      .map(function (t) {
        var n
        return ''
          .concat(t, ': ')
          .concat(
            (null !== (n = e[t]) && void 0 !== n ? n : 0).toFixed(2),
            '<br>'
          )
      })
      .join('')
  }

  return e.map((e) => {
    var n, r, i

    return {
      latitude: null !== (n = e.lat) && void 0 !== n ? n : 0,
      longitude: null !== (r = e.lng) && void 0 !== r ? r : 0,
      tooltip: {
        content: '<b>'
          .concat(
            null !== (i = e.division) && void 0 !== i ? i : 'Unknown',
            '</b><br><br>'
          )
          .concat(t(e)),
      },
    }
  })
}

const subscrribeToStreamr = async (
  id: string,
  onDataReceived: (msg: any) => any,
  last: number
) => {
  const streamr = new StreamrClient({
    auth: {
      privateKey: config.streamr.privateKey,
    },
  })

  await streamr.subscribe(
    {
      id,
      resend: {
        last,
      },
    },
    onDataReceived
  )
}

function App() {
  const [items, setItems] = React.useState<any[]>([])
  const [aiSummary, setAiSummary] = React.useState<string | null>(null)

  useEffectOnce(() => {
    subscrribeToStreamr(
      config.streamr.dataId!,
      (msg) => {
        setItems((items) => [...items, msg])
      },
      10
    )

    subscrribeToStreamr(
      config.streamr.summaryId!,
      (msg) => {
        console.log(msg)
        setAiSummary(msg.content)
      },
      1
    )
  })

  React.useEffect(() => {
    if (items.length < 1) return
    ;($('.container') as any).mapael({
      map: {
        name: 'world_countries',
      },
      defaultPlot: {
        size: 30,
        eventHandlers: {
          mouseover: function (...[e, t, n, r, i]: any[]) {
            'undefined' != typeof i.myText &&
              $('.myText span')
                .html(i.myText)
                .css({
                  display: 'none',
                })
                .fadeIn('slow')
          },
        },
      },
      plots: generatePlotItems(items),
    })
  }, [items])

  return (
    <div className="App">
      <div className="container">
        <div className="map">
          <div className="lds-hourglass"></div>
        </div>
      </div>
      <br />
      <br />
      {aiSummary && (
        <div className="summary">
          <img src="/weather_girl.jpg" alt="weather_girl" />
          {aiSummary
            ?.split('\n')
            .filter((i) => i)
            .map((line) => (
              <p key={line}>{line}</p>
            ))}
        </div>
      )}
      <br />
      <br />
    </div>
  )
}

export default App
