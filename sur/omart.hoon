::  omart: shared types for the plugin bazaar
::
|%
+$  id     term
+$  kind   ?(%bar-widget %panel %overlay %menu %service %bar)
+$  plugin
  $:  id=id
      name=@t
      version=@t
      author=@t
      ship=@p
      description=@t
      git=@t
      kinds=(list kind)
      tags=(list term)
      when=@da
  ==
+$  action
  $%  [%publish =plugin]
      [%retract =id]
  ==
+$  update
  $%  [%listings p=(list plugin)]
      [%plugin =plugin]
      [%gone =id]
  ==
--
