require 'spec_helper'

describe 'wizard', js: true do

  # before(:all) do
  #   create(:category)
  # end

  before do
    visit '/wizard'
  end

  describe 'sign up' do

    context 'with valid credentials' do
      it "signs up the user" do
        fill_in 'First name', with: 'John'
        fill_in 'Last name', with: 'Doe'
        fill_in 'Email', with: 'user@example.com'
        fill_in 'Password', with: 'password'

        click_link 'Next'

        page.should have_content('Select a category')
      end
    end

    context 'with invalid credentials' do
      it "displays the error and doesn't move on" do
        fill_in 'First name', with: 'John'
        fill_in 'Last name', with: 'Doe'
        fill_in 'Email', with: 'user@example'
        fill_in 'Password', with: 'password'

        click_link 'Next'

        page.should have_content('Please enter a valid email address.')
        page.should_not have_content('Select a category')
      end
    end

  end

  describe 'select a category' do
    context 'selected a category' do
      it 'moves on' do
        fill_in 'First name', with: 'John'
        fill_in 'Last name', with: 'Doe'
        fill_in 'Email', with: 'user@example.com'
        fill_in 'Password', with: 'password'

        click_link 'Next'

        select('nonprofit', :from => 'Select a category')

        click_link 'Next'

        page.should have_content('Title')
        page.should have_content('Description')
      end
    end

    context 'left the category blank' do
      it "displays the error and doesn't move on " do
        fill_in 'First name', with: 'John'
        fill_in 'Last name', with: 'Doe'
        fill_in 'Email', with: 'user@example.com'
        fill_in 'Password', with: 'password'

        click_link 'Next'
        click_link 'Next'

        page.should have_content('This field is required.')
        page.should_not have_content('Description')
        page.should_not have_content('Title') 
      end
    end
  end
end
