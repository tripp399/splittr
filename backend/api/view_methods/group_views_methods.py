from api.base_view import EndpointDataHandler
from api.models import Group, GroupMembership
from api.database import db
from api.utils.response_util import row_as_dict

class GroupViewsMethods(EndpointDataHandler):
    
    def create_group(self):
        print('### ', self.data)
        groupname = self.data['name']
        members = self.data['members']
        
        try:
            group = Group(name=groupname)
            group_membership = GroupMembership()
            memberships = []
            for member in members:
                group_membership = GroupMembership(user_id = member['id'])
                group_membership.group = group
                memberships.append(group_membership)

            db.session.add(group)
            for membership in memberships:
                db.session.add(membership)

        except Exception as err:
            print(err)
            raise Exception()
            
        db.session.commit()
        print('$$ {}'.format(group.group_id))

        return row_as_dict(group), 200
        