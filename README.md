## &lt;nc-docw&gt;

`nc-docw` Polymer component to display a document (header, lines, footer...) and extra info in tabs

To develop and test:

1. Clone repository
```
git clone git@github.com:neogrup/nc-docw.git
```
2. Test it with
```
polymer serve
```
3. Links

   [Demo page](http://localhost:8000/components/nc-docw/demo)
  
   [Documentation page](http://localhost:8000/components/nc-docw/)


4. Publish

```
npm publish
```


5. TODO
   
- OK Compare code in pos-tickets.list.js and pos-ticket-info-dialog
- OK set icon store, esta nc-icons
- OK update showed data when updated data
- OK update translations
- OK unificar iconos que eran diferentes
- OK mostrar pagos
- OK compatibilizar con otros doc antiguo, no falla si no están los datos
- OK poner moneda en símbolo y 3 dígitos en básico o en pagos
- OK opened, potser d'altres no es tradueix
- OK no traduce creditnote
- OK abono, no muestra bien devuelto, undefined
- OK muestra propina aunque no haya
- OK css que puedan falta, p.e. closed-delivered, falta test, los css eran diferentes !
- OK iconos especiales
- cargar historial al seleccionar pestaña, vía evento
- obtener vista para cambiar la URL
- mostrar historial, solo para el día actual
- update pos-tickets.list.js and pos-ticket-info-dialog with component nc-docw
- selectedtime, compatibilizar componente
- como muestra nombre de local, igualando o cuando está vacío??, asi no es necesario el shopcode cmoo control
- quitar claves de traducción de traducciones pos, que ya no se usan
- translations on demo, now there is a trick to work on demo
- color tab selected
- mirar si se puede configurar con mostrar info extra de producción
- ...