SELECT incidents.id, incidents.state, injuries.name as injury, affectedareas.name as "affectedArea", causes.name as "causeOfInjury"
FROM incidents
join injuries on incidents.injuryid = injuries.id
join affectedareas on affectedareas.id = injuries.affectedareaid
join causes on causes.id = incidents.causeid
WHERE incidents.state = $1