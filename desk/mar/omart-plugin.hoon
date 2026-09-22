/-  *omart
|_  p=plugin
++  grab
  |%
  ++  noun  plugin
  --
++  grow
  |%
  ++  noun  p
  ++  json
    =,  enjs:format
    %-  pairs
    :~  id+s+id.p
        name+s+name.p
        version+s+version.p
        author+s+author.p
        ship+s+(scot %p ship.p)
        description+s+description.p
        git+s+git.p
        kinds+a+(turn kinds.p |=(k=kind s+k))
        tags+a+(turn tags.p |=(t=term s+t))
        when+s+(scot %da when.p)
    ==
  --
++  grad  %noun
--
