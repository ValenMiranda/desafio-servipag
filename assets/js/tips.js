var tipsLuz = [
    'No deje los equipos, que se manejan con batería, conectados mucho tiempo. Nada más enchúfelos por el tiempo necesario para cargar la batería.',
    'Si vive en tierra caliente, procure prender los ventiladores, en vez del aire acondicionado, estos gastan menos energía.',
    'Mantenga desenchufados todos los cargadores. Aunque no estén cargando nada y parezcan apagados, siguen consumiendo energía.',
    'Nunca deje su televisor en modo de ‘Sleep’ o su computador en ‘Reiniciar’ pues siguen consumiendo mucha energía y de forma continua.',
    'Compre bombillos que ahorran energía. Estos también le harán ahorrar dinero cuando le llegue su factura de la luz.',
    'Mantenga desenchufados los aparatos eléctricos que no use muy seguido, sobre todo si vas a salir.',
    'Cuando no vaya a lavar una cantidad relevante de ropa, lo mejor es que use ciclos de lavados cortos y haga uso de aguda fría.',
    'Apague las luces cuando no las esté usando.',
    'Si va a calentar la comida, en vez de usar el horno eléctrico, haga uso del microondas. Este calienta la comida más rápido.',
    'Intente lavar el máximo de ropa que pueda en una sola lavada, esto con la idea de no estar usando a cada nada la lavadora que consume mucha energía.',
    'Mientras no esté usando su computador, apague el monitor o pantalla.'
];

var rand = tipsLuz[Math.floor(Math.random() * tipsLuz.length)];
$(".ahorro-tip").append(rand);