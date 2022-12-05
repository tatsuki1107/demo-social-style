from django.apps import AppConfig

feature_dict = {}
profession_dict = {}
relation_dict = {}
social_style_dict = {}
questions = []
class SocialStylesConfig(AppConfig):
    name = 'socialStyles'
    def ready(self):
        global feature_dict,profession_dict,relation_dict,social_style_dict,questions
        Feature = self.get_model('Feature')
        Profession = self.get_model('Profession')
        Relational = self.get_model('Relational')
        SocialStyle = self.get_model('SocialStyle')
        Question = self.get_model('Questions')
        feature = Feature.objects.all()
        profession = Profession.objects.all()
        relation = Relational.objects.all()
        social_style = SocialStyle.objects.all()
        question = Question.objects.all()
        for val in feature.values():
            if val["social_style_id_id"] in feature_dict:
                feature_dict[val["social_style_id_id"]].append(val["feature_explanation"])
            else:
                feature_dict[val["social_style_id_id"]] = []
                feature_dict[val["social_style_id_id"]].append(val["feature_explanation"])
        for val in profession.values():
            if val["social_style_id_id"] in profession_dict:
                profession_dict[val["social_style_id_id"]].append(val["profession_name"])
            else:
                profession_dict[val["social_style_id_id"]] = []
                profession_dict[val["social_style_id_id"]].append(val["profession_name"])
        for val in relation.values():
            if val["my_social_style_id_id"] in relation_dict:
                relation_dict[val["my_social_style_id_id"]].append(val["relational_description"])
            else:
                relation_dict[val["my_social_style_id_id"]] = []
                relation_dict[val["my_social_style_id_id"]].append(val["relational_description"])
        for val in social_style.values():
            social_style_dict[val["social_style_id"]] = val

        for val in question.values():
            del val['question_id']
            questions.append(val)
