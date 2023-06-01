# Login-System

Descripción del proyecto:
El proyecto consiste en desarrollar un sistema completo de inicio de sesión utilizando Node.js y Vue.js. Se utilizarán tecnologías como Node.js, JWT (JSON Web Tokens) y MySQL para crear una API REST propia que permita la autenticación de usuarios.

La biblioteca UUID es una herramienta utilizada en el desarrollo de software para generar identificadores únicos de manera consistente. Un identificador UUID es un número de 128 bits que se representa normalmente como una cadena de caracteres alfanuméricos separados por guiones.

Razones por las que es una buena opción usar UUID en lugar de un id autonumérico:

1. Universalmente único: Los identificadores UUID están diseñados para ser únicos a nivel mundial, lo que significa que es altamente improbable generar dos identificadores iguales. Esto es especialmente útil cuando se trabaja en sistemas distribuidos o en entornos donde múltiples fuentes pueden generar identificadores.

2. Independiente del origen: Los identificadores UUID no dependen de una fuente centralizada para su generación, como una base de datos o un servidor. Pueden generarse localmente en cualquier dispositivo o plataforma, lo que facilita su uso en entornos descentralizados o en dispositivos que operan de forma independiente.

3. No secuenciales: A diferencia de los id autonuméricos que suelen ser secuenciales, los identificadores UUID se generan utilizando algoritmos que generan valores pseudoaleatorios. Esto evita la posibilidad de adivinar o inferir otros identificadores basándose en su valor secuencial.

4. Privacidad y seguridad: Al no seguir una secuencia predecible, los identificadores UUID proporcionan un cierto nivel de privacidad y seguridad. No revelan información sobre el número de registros existentes ni el orden de creación.

5. Escalabilidad: Los identificadores UUID pueden generarse y utilizarse en diferentes sistemas y bases de datos sin conflictos, lo que facilita la escalabilidad del sistema en entornos distribuidos o en crecimiento.