from rest_framework import viewsets
from .models import UserProfile, Complaint
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.contrib.auth.models import User

# Create your views here.


class ComplaintViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']

  # Get all Complaint objects:
  queryset = Complaint.objects.all()
  serializer_class = ComplaintSerializer(queryset, many=True)
  

  def list(self, request):
    # Get all complaints from the user's district
    return Response(self.serializer_class.data)
    

class OpenCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']

  # Get all Complaint objects filtered based on valid close date:
  queryset = Complaint.objects.filter(closedate__isnull=True)
  serializer_class = ComplaintSerializer(queryset, many=True)


  def list(self, request):
    return Response(self.serializer_class.data)


class ClosedCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']

  # Get all Complaint objects filtered based on missing or no close date
  queryset = Complaint.objects.filter(closedate__isnull=False)
  serializer_class = ComplaintSerializer(queryset, many=True)


  def list(self, request):
    # Get only complaints that are close from the user's district
    return Response(self.serializer_class.data)

    
class TopComplaintTypeViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']

  hashTable = {}
  cleanedHashTable = {}

  # Get complaint type & account district filtered for only valid non-null complaint type data
  complaint_types = Complaint.objects.values('complaint_type', 'account').filter(complaint_type__isnull=False)

  # Set each category of different complaint types for each district and count number of each complaint category for each district
  for each_comp_dist in complaint_types:
    if each_comp_dist['account'] not in hashTable:
      hashTable[each_comp_dist['account']] = {each_comp_dist['complaint_type']: 0}
    else:
      if each_comp_dist['complaint_type'] not in hashTable[each_comp_dist['account']]:
        hashTable[each_comp_dist['account']][each_comp_dist['complaint_type']] = 0
      else:
        hashTable[each_comp_dist['account']][each_comp_dist['complaint_type']] += 1

  # Get rid of all complaints from each account district with a complaint type that has a count of 0 (complaints not made in that district)
  for each_dist in hashTable:
    cleanedHashTable[each_dist] = {key:val for key, val in hashTable[each_dist].items() if val != 0}

  # Sort by descending order, the complaint types for each district based on how many times that complaint was made for that district
  for one_district in cleanedHashTable:
    cleanedHashTable[one_district] = sorted(cleanedHashTable[one_district].items(), key = lambda kv:(kv[1], kv[0]), reverse=True)


  def list(self, request):
    # Get the top 3 complaint types from the user's district
    return Response(self.cleanedHashTable)


class ConstituentViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']

  # Get Complaint objects filtered for only valid council_dist data values and valid complaint_type data values
  queryset = Complaint.objects.filter(council_dist__isnull=False).filter(complaint_type__isnull=False)
  serializer_class = ComplaintSerializer(queryset, many=True)


  def list(self, request):
    # Get only complaints that are close from the user's district
    return Response(self.serializer_class.data)


class UserViewSet(viewsets.ModelViewSet):

  # Get all UserProfile Objects 
  user_profile_queryset = UserProfile.objects.all()
  user_profile_serializer = UserProfileSerializer(user_profile_queryset, many=True)

  # Get all User Objects 
  user_queryset = User.objects.all()
  user_serializer = UserSerializer(user_queryset, many=True)

  
  def list(self, request):
    # Get all user information
    return Response(self.user_profile_serializer.data)