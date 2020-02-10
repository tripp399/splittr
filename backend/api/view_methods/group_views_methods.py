from api.base_view import EndpointDataHandler
from api.models import Group, GroupMembership, User, Expense
from api.database import db
from api.utils.response_util import model_as_dict

class GroupViewsMethods(EndpointDataHandler):
    
    def create_group(self):
        print('### ', self.data)
        groupname = self.data['name']
        members = self.data['members']
        
        try:
            group = Group(name=groupname)
            memberships = []
            for member in members:
                group_membership = GroupMembership(user_id=member['id'])
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

        return model_as_dict(group), 200
    
    def get_groups(self):
        userid = self.data['userid']
        try:
            res = Group.query.join(GroupMembership).filter(GroupMembership.user_id == userid).all()
            groups = list(map(lambda group: model_as_dict(group), res))
        except Exception as err:
            raise Exception()

        return groups, 200

    def get_group(self, group_id):
        print('### HOLA MUNDOS!')
        try:
            group = Group.query.filter(Group.group_id == group_id).first()
        except Exception as err:
            raise Exception()

        return model_as_dict(group), 200

    def get_members(self):
        groupid = self.data['groupid']
        try:
            res = User.query.join(GroupMembership).filter(GroupMembership.group_id == groupid).all()
            members = list(map(lambda user: model_as_dict(user), res))
        except Exception as err:
            raise Exception()

        return members, 200

    def get_expenses(self):
        groupid = self.data['groupid']
        try:
            res = Expense.query.filter_by(Expense.group_id == groupid).all()
            expenses = list(map(lambda expense: model_as_dict(expense), res))
        except Exception as err:
            raise Exception()

        return expenses, 200

    def create_expense(self):
        try:
            print(self.data)
        except Expense as err:
            print(err)
            raise Exception()
