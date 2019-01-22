var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // if we can carry more energy 
	    if(creep.carry.energy < creep.carryCapacity) {
            // find sources of energy
            var sources = creep.room.find(FIND_SOURCES);
            // if the nearest(?) source is not in range
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                // move to the nearest source (and draw a dotted line showing the path)
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            // we must be carrying a full load of energy

            // find structures in the current room that are either spawns or extensions
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        // return the structure as a target if it is an extension or a spawn and its stored energy is less than its storage capacity
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            // if any targets were returned
            if(targets.length > 0) {
                // attempt to transfer energy to the target, failing that move toward the target
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleHarvester;
