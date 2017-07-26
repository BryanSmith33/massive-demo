INSERT into incidents(state, causeid, injuryid)
values($1, $2 , $3)
returning id