/* 
 * Parent class is StaffMember
 */

var StaffMemberDeveloper = function() {
    this.skills = [];
    
    this.getSkills = function() {
        console.log(this.skills);
    };
    
    this.setSkill = function(skill) {
        var length = this.skills.length;
        this.skills[length] = skill;
    };
};

StaffMemberDeveloper.prototype = new StaffMember();

