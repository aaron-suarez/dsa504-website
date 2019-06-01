import React from "react"
import EventJsonLd from "./event-json-ld"
import injectSheet from "react-jss"
import styles from "./styles"
import { Link } from "gatsby"
import { kebabCase } from "lodash"

const Event = ({
  summary,
  creator,
  description,
  location,
  start,
  end,
  classes,
  htmlLink,
  fields,
  ...rest
}) => {
  if (!start) return null

  const { slugDate, monthAndDay, dayOfWeek, startLocalTime, endLocalTime } =
    fields || {}
  const emailSubject = `${monthAndDay} ${summary}`

  const slug = `${slugDate}-${kebabCase(summary)}`

  return (
    <div className={classes.root} itemScope itemType="http://schema.org/Event">
      <EventJsonLd
        {...{ summary, description, start, end, location, fields }}
      />
      <meta itemProp="startDate" content={start.dateTime} />
      <div>
        <div className={classes.date}>
          <strong>{dayOfWeek}</strong>, {monthAndDay}
        </div>
        <div className={classes.timespan}>
          {startLocalTime} - {endLocalTime}
        </div>
      </div>
      {/* TODO: move event slug creation to normalizer */}
      <Link to={`/events/${slug}`} className={classes.nameLink}>
        <h4 itemProp="name" className={classes.name}>
          {summary}
        </h4>
      </Link>
      <a href={htmlLink}>Add to your calendar</a>
      <a
        className={classes.link}
        href={`mailto:${creator.email}?subject=${encodeURIComponent(
          emailSubject
        )}`}
      >
        ✉ Contact organizer
      </a>
      <a
        className={classes.locationLink}
        href={`https://google.com/maps/search/${encodeURIComponent(location)}`}
      >
        <div className={classes.location}>{location}</div>
      </a>
      <p
        itemProp="description"
        className={classes.description}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  )
}

export default injectSheet(styles)(Event)
