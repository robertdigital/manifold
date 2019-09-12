require 'swagger_helper'

RSpec.describe "Projects API", type: :request do
  include_context("authenticated request")
  include_context("param helpers")

  let(:project) { FactoryBot.create(:project, draft: false, purchase_price: "10.00") }

  path '/projects' do
    get I18n.t('swagger.get.all.description', type: 'projects') do
      produces 'application/json'
      security [ apiKey: [] ]
      tags 'Projects'

      response '200', I18n.t('swagger.get.all.200', type: 'projects') do
        let(:Authorization) { reader_auth }
        schema '$ref' => '#/definitions/ProjectsResponse'
        run_test!
      end
    end

    post I18n.t('swagger.post.description', type: 'project') do
      consumes 'application/json'
      produces 'application/json'
      parameter name: :project, in: :body, schema: { '$ref' => '#/definitions/ProjectRequestCreate' }
      security [ apiKey: [] ]
      tags 'Projects'

      response '201', I18n.t('swagger.post.201', type: 'project') do
        let(:Authorization) { admin_auth }
        let(:project) {
          {
            data: {
              attributes: {
                title: "Type.string",
                featured: "Type.string",
                hashtag: "Type.string",
                description: "Type.string",
                purchaseUrl: "http://website.com",
                purchasePriceCurrency: "USD",
                facebookId: "Type.id",
                purchaseCallToAction: "Type.string",
                twitterId: "Type.id",
                hideActivity: "Type.string",
                instagramId: "Type.id",
                downloadUrl: "Type.url",
                draft: "Type.string",
                downloadCallToAction: "Type.string",
                publicationDate: "Type.string",
                avatarColor: "primary",
                pendingSlug: "string",
                tagList: "Type.array( type: Type.string )",
                darkMode: true,
                imageCredits: "Type.string",
                standaloneModePressBarUrl: "http://url.com",
              }
            }
          }
        }
        schema '$ref' => '#/definitions/ProjectResponse'
        run_test!
      end
    end
  end

  path '/projects/{id_or_slug}' do
    get I18n.t('swagger.get.one.description', type: 'project', attribute: 'ID or slug') do
      produces 'application/json'
      security [ apiKey: [] ]
      parameter name: :id_or_slug, :in => :path, :type => :string
      tags 'Projects'

      response '200', I18n.t('swagger.get.one.200', type: 'project', attribute: 'ID or slug') do
        let(:Authorization) { reader_auth }
        let(:id_or_slug) { project["slug"] }
        schema '$ref' => '#/definitions/ProjectResponseFull'
        run_test!
      end

      response '404', I18n.t('swagger.not_found') do
        let(:Authorization) { reader_auth }
        let(:id_or_slug) { 'a' }
        schema '$ref' => '#/definitions/NotFound'
        run_test!
      end
    end

    patch I18n.t('swagger.patch.description', type: 'project', attribute: 'ID or slug') do
      parameter name: :id_or_slug, :in => :path, :type => :string

      parameter name: :project_patch, in: :body, schema: { '$ref' => '#/definitions/ProjectRequestUpdate' }
      let(:project_patch) {
        {
          data: {
            attributes: {
              title: "Type.string",
              featured: "Type.string",
              hashtag: "Type.string",
              description: "Type.string",
              purchaseUrl: "http://website.com",
              purchasePriceCurrency: "USD",
              facebookId: "Type.id",
              purchaseCallToAction: "Type.string",
              twitterId: "Type.id",
              hideActivity: "Type.string",
              instagramId: "Type.id",
              downloadUrl: "Type.url",
              draft: "Type.string",
              downloadCallToAction: "Type.string",
              publicationDate: "Type.string",
              avatarColor: "primary",
              pendingSlug: "string",
              tagList: "Type.array( type: Type.string )",
              darkMode: true,
              imageCredits: "Type.string",
              standaloneModePressBarUrl: "http://url.com",
              removeAvatar: true,
              removeHero: true,
              removeCover: true,
            }
          }
        }
      }

      consumes 'application/json'
      produces 'application/json'
      security [ apiKey: [] ]
      tags 'Projects'

      response '200', I18n.t('swagger.patch.200', type: 'project', attribute: 'ID or slug') do
        let(:Authorization) { admin_auth }
        let(:id_or_slug) { project["slug"] }
        schema '$ref' => '#/definitions/ProjectResponseFull'
        run_test!
      end

      response '403', I18n.t('swagger.access_denied') do
        let(:Authorization) { reader_auth }
        let(:id_or_slug) { project["slug"] }
        run_test!
      end

      response '404', I18n.t('swagger.not_found') do
        let(:Authorization) { reader_auth }
        let(:id_or_slug) { 'a' }
        schema '$ref' => '#/definitions/NotFound'
        run_test!
      end
    end

    delete I18n.t('swagger.delete.description', type: 'project', attribute: 'ID or slug') do
      parameter name: :id_or_slug, :in => :path, :type => :string
      let(:id_or_slug) { project["slug"] }

      security [ apiKey: [] ]
      tags 'Projects'

      response '204', I18n.t('swagger.delete.204', type: 'project', attribute: 'ID or slug') do
        let(:Authorization) { admin_auth }
        run_test!
      end

      response '403', I18n.t('swagger.access_denied') do
        let(:Authorization) { author_auth }
        run_test!
      end
    end
  end

  describe "sends a single project" do
    let(:path) { api_v1_project_path(project) }

    context "when the user is an admin" do
      before(:each) { get path, headers: admin_headers }
      describe "the response" do
        it "has a 200 status code" do
          expect(response).to have_http_status(200)
        end
      end
    end
  end

  describe "updates a project" do
    let(:path) { api_v1_project_path(project) }
    let(:metadata) do
      {
        "isbn" => "1234",
        "publisher" => "Someone",
        "publisherPlace" => "Somewhere",
        "containerTitle" => "The Hardy Boys"
      }
    end
    context "when the user is an admin" do
      let(:headers) { admin_headers }

      let(:john) { FactoryBot.create(:maker, first_name: "John") }
      let(:jim) { FactoryBot.create(:maker, first_name: "Jim") }
      let(:jenny) { FactoryBot.create(:maker, first_name: "Jenny") }

      describe "its creator association" do
        it("can be replaced") do
          project.creators << jenny
          params = json_payload(relationships: { creators: { data: [
                                  { type: "makers", id: john.id },
                                  { type: "makers", id: jim.id }
                                ] } })
          patch path, headers: headers, params: params
          expect(project.creators.reload.pluck(:id)).to contain_exactly(john.id, jim.id)
        end
      end

      describe "its contributors" do
        it("can be replaced") do
          project.contributors << jenny
          params = json_payload(relationships: { contributors: { data: [
                                  { type: "makers", id: john.id },
                                  { type: "makers", id: jim.id }
                                ] } })
          patch path, headers: headers, params: params
          expect(project.contributors.reload.pluck(:id)).to contain_exactly(john.id, jim.id)
        end

        it("are sorted correctly after being set") do
          project.contributors << jenny
          project.contributors << john
          project.save
          expect(project.contributors.reload.pluck(:id)).to eq([jenny.id, john.id])
          params = json_payload(relationships: { contributors: { data: [
                                  { type: "makers", id: john.id },
                                  { type: "makers", id: jenny.id }
                                ] } })
          patch path, headers: headers, params: params
          expect(project.contributors.reload.pluck(:id)).to eq([john.id, jenny.id])
        end
      end

      describe "its creators" do
        it("can be replaced") do
          project.creators << jenny
          params = json_payload(relationships: { creators: { data: [
                                  { type: "makers", id: john.id },
                                  { type: "makers", id: jim.id }
                                ] } })
          patch path, headers: headers, params: params
          expect(project.creators.reload.pluck(:id)).to contain_exactly(jim.id, john.id)
        end

        it("are sorted correctly after being set") do
          project.creators << jenny
          project.creators << john
          project.save
          expect(project.creators.pluck(:id)).to eq([jenny.id, john.id])
          params = json_payload(relationships: { creators: { data: [
                                  { type: "makers", id: john.id },
                                  { type: "makers", id: jenny.id }
                                ] } })
          patch path, headers: headers, params: params
          expect(project.creators.reload.pluck(:id)).to eq([john.id, jenny.id])
        end
      end

      describe "the response" do
        context "body" do
          it("contains the updated title") { expect_updated_param("title", "a title") }
          it("contains the updated metadata") { expect_updated_param("metadata", metadata) }
          it("contains the updated subtitle") { expect_updated_param("subtitle", "a subtitle") }
          it("contains the updated featured boolean value") { expect_updated_param("featured", "true", true) }
          it("contains the updated hashtag") { expect_updated_param("hashtag", "the_hashtag") }
          it("contains the updated description") { expect_updated_param("description", "the description") }
          it("contains the updated purchase price") { expect_updated_param("purchasePriceMoney", "$7.95", 7.95, "purchasePrice") }
          it("contains the updated tag list") { expect_updated_param("tagList", "rowan, dog, puppy", %w(rowan dog puppy)) }
          context "contains the updated purchase price" do
            it("when the currency sign is not present") { expect_updated_param("purchasePriceMoney", "2.50", "$2.50") }
            it("when the currency sign is present") { expect_updated_param("purchasePriceMoney", "$2.50", "$2.50") }
            it("when the purchase price is empty") { expect_updated_param("purchasePriceMoney", "", 0.0, "purchasePrice") }
          end
          context "does not update the purchase price" do
            it("when the price is not included in params") { expect_updated_param("purchasePriceMoney", nil, 10.0, "purchasePrice") }
          end
        end

        it "has a 200 OK status code" do
          patch path, headers: headers, params: json_payload
          expect(response).to have_http_status(200)
        end
      end
    end

    context "when the user is a reader" do
      let(:headers) { reader_headers }

      describe "the response" do
        it "has a 403 forbidden status code" do
          patch path, headers: headers, params: json_payload
          expect(response).to have_http_status(403)
        end
      end
    end
  end

  describe "destroys a project" do
    let(:path) { api_v1_project_path(project) }

    context "when the user is an admin" do
      let(:headers) { admin_headers }

      it "has a 204 NO CONTENT status code" do
        delete path, headers: headers
        expect(response).to have_http_status(204)
      end
    end

    context "when the user is a reader" do
      let(:headers) { reader_headers }

      it "has a 403 FORBIDDEN status code" do
        delete path, headers: headers
        expect(response).to have_http_status(403)
      end
    end
  end
end
