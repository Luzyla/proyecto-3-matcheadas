Lu, Rosi, 

Como siempre, lo primero que quiero hacer es felicitarlas por un excelente trabajo, aunque en este caso esta felicitación se siente como muy poco. Que hayan logrado entregarme un trabajo completo siendo solo dos personas trabajando, que además hayan puesto esfuerzo en entregarme un trabajo original con un diseño propio, que se hayan molestado por detalles que no vimos en otros grupos, y que la calidad de su código sea excelente a pesar de todo esto... bueno! Se merece mucho más que unas felicitaciones. No tengo palabras para expresarlo. Espero que ustedes estén muy orgullosas de este trabajo. 

Su HTML está muy bien, y agradezco que no hayan olvidado utilizar las etiquetas correspondientes a pesar de que no era el foco de este grupo. Su CSS está muy completo y prolijo. Su README es muy bueno, dan ganas de ver el producto que hicieron. Espero que estén publicitando este trabajo en todos lados!

Con respecto al producto entregado, ya dije que me encanta el diseño? No solo me encanta, me parece buenísimo que lo hayan hecho propio y que todo el trabajo tenga una temática. Ese grado de detalle, de preocupación por el trabajo final, separa a alguien que meramente escribe código de quién crea productos con pasión. 
Abundan detalles y se nota la preocupación de que todo funcione bien. 

Me dejaron el codigo del timer comentado en HTML: es preferible que esas cosas no esten en el producto final si no tienen la funcionalidad hecha. Quieren entregar un producto lo más terminado posible, si no llegaron con alguna funcionalidad no tiene sentido dejar rastros de ella en el código. Lo que no se borra, se olvida, y lo que se olvida queda para siempre, confundiendo futuros colegas que pueden ver ese codigo.

Con respecto al código, lo veo muy bien. Es fácil seguirlo y entenderlo ya que está correctamente funcionalizado y la mayoria de las veces usan nombres muy claros. Ocasionalmente hay detalles en donde es dificil seguir lo que quisieron hacer, en esos casos se agradeceria mucho algun comentario que indique lo que hace una linea o nombres de variables mas claros. 

No les digo esto porque espero que lo hagan siempre (mucho menos en esta etapa de su aprendizaje), pero reflexionen en este ejemplo:

Su codigo actualmente tiene esta linea:

`else if (x - 1 == 0 || x == 0 || (!cuadroArriba && x != 0)) {` 

Comparenla con otra linea de su mismo codigo:

`if (sonAdyacentes(primerCuadrado, segundoCuadrado)) {`

Cual es mas legible? Que lecciones nos da la segunda linea, que podemos aplicar en la primera? 

No se si notaron que, mientras mas se juega, mas rapido parece ir el reloj. Y eso es exactamente lo que esta ocurriendo: una vez que un timeout se inicia en JS, nada lo puede detener. Si inicio un juego y 15 segundos despues le doy click al boton de reiniciar, pasaran solo 15 segundos hasta que vea el modal de "Juego finalizado!". 

Para evitar eso, debemos "limpiar" el timeout. 
1. Definimos una variable vacia: let tiempoRestante
2. En lugar de hacer el timeout a secas, lo asignamos a esa variable: `tiempoRestante = setTimeout(timeout, 30000)`
3. Al momento de reiniciar el juego, usamos el metodo clearTimeout: `clearTimeout(tiempoRestante)`

Me alegra muchisimo que hayan incorporado combos y un detalle que pocos grupos lograron, que las fichas "caigan" de arriba hacia abajo cuando hay un match. Era sin dudas la parte mas dificil de todo el trabajo, y es un orgullo ver lo bien que la resolvieron. 

Ocasionalmente tienen un error en la consola durante los combos, que no parece afectar el funcionamiento del juego: Cannot read property 'classList' of null. Me parece que lo que ocurre es que los elementos se borran mas rapido de lo que van sus funciones, pero tendria que hacer mas pruebas para encontrar la fuente del error. Si lo hago, les aviso!

A nivel visual, creo que una mejora muy grande seria darle algun tipo de animacion a los emojis cuando desaparecen. Tal como estan ahora, desaparecen de golpe y arruina un poco el impacto de su trabajo tan bueno. 

Mas alla de esos detalles, no quiero dejar de felicitarlas de nuevo por un excelente trabajo. 

Nota final: 9

