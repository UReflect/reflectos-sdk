namespace UR {
  export class URComponent extends Vue {
    private static methods: any = {
      hello: URComponent.prototype.hello
    }

    private static template: string = "<div id='URComponent'><slot></slot></div>"

    hello() {
      console.log('URComponent hello world')
    }
  }
}
