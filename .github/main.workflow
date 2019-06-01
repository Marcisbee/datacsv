workflow "Install, Test, Lint and Publish" {
  on = "push"
  resolves = ["Publish"]
}

action "Install" {
  uses = "actions/npm@master"
  args = "install"
}

action "Lint" {
  needs = "Install"
  uses = "actions/npm@master"
  args = "run lint"
}

action "Test" {
  needs = "Install"
  uses = "actions/npm@master"
  args = "test"
}

action "Types" {
  needs = "Install"
  uses = "actions/npm@master"
  args = "run types"
}

# Filter for a new tag
action "Tag" {
  needs = ["Lint", "Test"]
  uses = "actions/bin/filter@master"
  args = "tag"
}

action "Publish" {
  needs = "Tag"
  uses = "actions/npm@master"
  args = "publish --access public"
  secrets = ["NPM_AUTH_TOKEN"]
}
