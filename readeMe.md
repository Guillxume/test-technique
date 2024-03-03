# test-technique-bobochic

Test technique

## Introduction

Pour la réalisation de ce test technique, nous souhaitons évaluer vos compétences en HTML, CSS, et JS voire même aussi PHP !

Vous devez alors réaliser l'intégration complète d'une page web (tout ce qu'il y a entre le fil d'ariane et le bandeau de réassurance). Il s'agit d'un modèle d'intégration basique qui vous sera régulièrement demandé chez Bobochic.


## Contraintes techniques

Vous devez déposer votre rendu dans un repository github. 

Nous sommes sur le web, le SEO doit être pris en compte dans l'intégration.

On doit pouvoir copier-coller le code en 1 clic en cliquant sur l'encart pointillé du code promo.


## Maquette de l'intégration

Il est impératif de vous __créer un compte et vous connecter sur Figma__ afin de pouvoir inspecter les élèments de la maquette et avoir toutes les informations nécessaires (font-size, line-Height, margin, paddgin, etc...).

Vous pouvez directement exporter l'ensemble des icônes et des images depuis la maquette Figma.

[Maquette FIGMA](https://www.figma.com/file/JSglwknWdoDh8w9rmmXvQc/Test-technique-%7C-Bobochic?type=design&node-id=0%3A1&mode=design&t=jIdoXZH2gxGJLOYJ-1)


## Bonus du test

BONUS 1 : intégration en dur du header et du footer (sans javascript)

BONUS 2 : gérer dynamiquement les codes promos actifs et inactifs en PHP ou en JS via un tableau 
Les codes promos actifs et inactifs sont triés dans l'ordre en fonction de la date d'expiration la plus proche de la date du jour. 
Voici un exemple :

```
array =>
    'id_cart_rule' => 1
    'date_from' => '2024-02-01 10:00:00' 
    'date_to' => '2024-02-29 10:00:00'
    'description' => 'Bénéficiez d’un Tapis pour un minimum d’achat de 1000 € avec le code « TAPISGRATUIT » valable sur tout le site https://bobochicparis.com/fr/, dans la limite des stocks disponibles. Offre non valable pour l’achat sur les de produits porteurs de la mention "produit non remisé" sur la fiche produit. Offre valable du 01/02/2024 à 10h au 06/03/2024 à 10h.'
    'code' => 'TAPISGRATUIT'
    'condition' => 'Offre valable uniquement en France Métropolitaine. Non cumulable avec une autre offre promotionnelle en cours. Offre valable lors d’un paiement avec une carte cadeau.'
```


