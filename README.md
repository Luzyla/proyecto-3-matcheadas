# DURANTE EL DESARROLLO

## Uso de GIT & GitHub
- Antes de empezar a trabajar con un tema, crear una BRANCH con el nombre del tema general. Ejemplo: "design" para el estilado. El nombre puede ser en castellano o en inglés. 
    - Crear e ir a la branch: git checkout -b nombredelabranch (si se hace desde main, se obtendrá una copia de main al momento de ejecutar el comando)
    - Moverse de una branch a la otra: git checkout main (para volver a main desde la branch creada)
    - Si la branch fue creada en el repositorio local, para subirla a GitHub antes de hacer push hay que hacer: git push --set-upstream origin elnombredelabranch (esto se hace sólo la primera vez)
    - Para saber en qué branch estoy trabajando: git branch (muestra listado de branches, y con un * la branch en la que estoy posicionada).
    - IMPORTANTE: hacer commits periódicos.

- Una vez que el código de la branch está terminado, requiere unir al código integrado a main:
    - Primero ir a main: git checkout main
    - Segundo, hacer el merge: git merge nombredelabranch

- Cualquier duda, nos preguntamos mutuamente! 
- Quién quiera sumar algún comando más que sume, bienvenido!
