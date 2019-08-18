angular.module('module.config.system', 
	[
		'module.ui.main-menu',
        'module.ui.list-form'
	]
)

// Abstract model of entity
.service('Entity', [
    'resourceService',

	moduleConfigSystem.Entity
    ]
)

// Abstract model of entity list
.service('EntityList', [
    'resourceService',

	moduleConfigSystem.EntityList
    ]
)

// Abstract model of enums
.service('Enum', [
    'resourceService',

	moduleConfigSystem.Enum
    ]
)

// Abstract model of entity field
.service('MetadataEditField', [

	moduleConfigSystem.MetadataEditField
	]
)

.service('MetadataObject', [

    moduleConfigSystem.MetadataObject
    ]
)

.service('MetadataEntitySpecification', [
    'fmListForm_TYPES',
    'MetadataEditField',

    moduleConfigSystem.MetadataEntitySpecification
    ]
)

.service('MetadataSet', [
    'userInterface',
    'EntityList',
    'metadataEvents',
    'MetadataEntitySpecification',
    'MetadataObject',

	moduleConfigSystem.MetadataSet
    ]
)

.service('metadataEvents',

	function(){
        var MetadataEvents = moduleConfigSystem.MetadataEvents;
		return new MetadataEvents();
	}
)

.service('abstractAppModel', [
    'Entity',
    'Enum',
    'MetadataSet',

    function(Entity, Enum, MetadataSet){
        return {
            Entity: Entity,
            Enum: Enum,
            MetadataSet: MetadataSet
        };
    }]
)

.service('principal',

    function(){
        var  Principal = moduleConfigSystem.Principal;
        return new Principal();
    }
)

;

