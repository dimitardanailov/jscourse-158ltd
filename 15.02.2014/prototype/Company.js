var Company = function() {  
  /** Constuctor **/
  this.name = 'default company';
  this.staffMembers = [];
  this.office = {};
  this.bankInfo = {};
  
  /** Name **/
  this.getName = function() {
      return this.name;
  };
    
  this.setName = function(name) {
      this.name = name;
  };
  
  /** StaffMembers **/
  this.getStaffMembers = function() {
      for (var iterator in this.staffMembers) {
          var singleStaffMember = this.staffMembers[iterator];
          console.log(singleStaffMember.getName());
          console.log('-----');
      }
  };
  
  /**
   * Set StaffMember
   * @param {StaffMember} staffMember
   * @return {void}
   */
  this.setStaffMember = function(staffMember) {
      var isStaffMember = staffMember instanceof StaffMember;

      try {
        if (isStaffMember) {
            var length = this.staffMembers.length;
            this.staffMembers[length] = staffMember;
        } else {
            throw "Invalid Type StaffMember Exception";
        }
      } catch (e) {
          console.log(e);
      }
  };
};

