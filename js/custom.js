let definitions = {
    definition_1 : {
        currentLanguage: "pt_BR",
        pt_BR: "um desenvolvedor de software brasileiro",
        en: "a brazilian software developer"
    },
    definition_2: {
        currentLanguage: "pt_BR",
        pt_BR: "um bocado de tudos, nadas e meios termos",
        en: "a bunch of everythings, nothings and in-betweens (whatever that means)"
    }
}

function getId (event) {
    return event.target.id
}

function switchDefinitionLanguage (defId, lang) {
    let definition = definitions[defId]
    if (definition.currentLanguage === lang)
        return

    $( `#${defId}` )
        .hide()
        .text(definition[lang])
        .toggleClass("fst-italic text-primary")
        .fadeIn(100)

    definition.currentLanguage = lang
}

function toggleDefinitionLanguage (defId) {
    let currentLang = definitions[defId].currentLanguage
    if (currentLang === "pt_BR")
        switchDefinitionLanguage(defId, "en")
    else
        switchDefinitionLanguage(defId, "pt_BR")
}

$( document ).ready(function() {

    $( "#definition_1" ).text(definitions.definition_1.pt_BR)
    $( "#definition_2" ).text(definitions.definition_2.pt_BR)

    $("#definitions li").hover(
        function hoverIn( event ) {
            switchDefinitionLanguage(getId(event), "en")
        },
        function hoverOut( event ) {
            switchDefinitionLanguage(getId(event), "pt_BR")
        }
    )

    // Adding support for mobile
    $("#definitions li").click(function ( event ) {
        toggleDefinitionLanguage(getId(event))
    })

});